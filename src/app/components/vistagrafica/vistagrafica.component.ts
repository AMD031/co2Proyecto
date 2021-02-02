
import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import * as moment from 'moment';
// import * as d3 from 'd3-selection';
// import * as d3Scale from 'd3-scale';
// import * as d3Array from 'd3-array';
// import * as d3Scale from 'd3-scale';
// import * as d3Shape from 'd3-shape';
// import * as d3Axis from 'd3-axis';
// import * as d3Zoom from 'd3-zoom';
// import * as d3Brush from 'd3-brush';
// import * as d3Array from 'd3-array';
import * as d3 from "d3";
import { CargarEstacionEntradasName } from 'src/store/actions';
import { AppState } from 'src/store/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MensajesalertasService } from 'src/app/services/mensajesalertas.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-vistagrafica',
  templateUrl: './vistagrafica.component.html',
  styleUrls: ['./vistagrafica.component.scss'],
})
export class VistagraficaComponent {
  //@Input('data') data:any = [];
  @Input('nombre') nombre: string;
  @Input('pagina') pagina: number;
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;
  myColor: any;
  dataReady: any = [];
  data: any = [];
  page: number = 1;
  mostrarTexto:boolean = true; 
  tamagnoFuente: number  = 10;
  ob$: Subscription;
  altoEjeY: number = 1250;
  inicio: string;
  fin: string;


  private allGroup: any = ["CO2", "temp", "humid", "press", "noise"];

  

  
  constructor(
    private store: Store<AppState>,
    private mensajeAlerta: MensajesalertasService
    ) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }


  disminuir() {
    try {
      if (this.page > 1) {
        this.page--;
        if (this.data && this.data.length > 0) {
          this.store.dispatch(new CargarEstacionEntradasName(this.nombre, this.page));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }




  aumentar() {
    if (this.page >= 1) {
      this.page++;
      if (this.data && this.data.length > 0) {
        this.store.dispatch(new CargarEstacionEntradasName(this.nombre, this.page));
      } else {
        this.page = 1;
        this.store.dispatch(new CargarEstacionEntradasName(this.nombre, this.page));
        this.ob$.unsubscribe;
        this.iniciarCarga();
      }
    }
  }



  // visualizarValores() {
  //   //this.altoEjeY = 200;
  //   this.allGroup = ["CO2"];
  //   if (this.data && this.data.length > 0) {
  //     this.store.dispatch(new CargarEstacionEntradasName(this.nombre, this.page));
  //   }
  // }

  borraGrafica(){
    d3.selectAll(".linealChart > *").remove();
  }

  iniciarCarga() {
    try {
      this.store.dispatch(new CargarEstacionEntradasName(this.nombre, this.page));
      this.ob$ = this.store.select('EntradasPaginadas').pipe().subscribe(
        (datos) => {
          this.data = datos.Entradas;
          if (this.data && this.data.length > 0) {
            this.borraGrafica();
            this.inicarGrafica()
          }
        })
    } catch (error) {

    }

  }

  ngOnInit(): void {
    this.iniciarCarga();
  }


  private inicarGrafica() {
    this.initSvg();
    this.reformatData();
    this.colorScale();
    this.initAxis();
    this.addLines();
    this.addPoints();
    this.mostrarTexto && this.addLabels();
    this.leyenEndline();
  }


  initSvg() {

    this.svg = d3.select(".linealChart")
      .append("svg")
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${900} ${400}`)
      .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  reformatData() {
    this.dataReady = this.allGroup.map((grpName) => {
      return {
        name: grpName,
        values: this.data.map((d) => {
          return { time: d.time, value: d.data[grpName] };
        })
      };
    });
    //console.log(this.dataReady);
  }

  colorScale() {
    this.myColor = d3.scaleOrdinal()
      .domain(this.allGroup)
      .range(d3.schemeSet2);
    //  .range( ["#FAA","#00F"]); 
  }


  initAxis() {
    
    this.inicio= moment(this.data[this.data.length - 1].time).subtract(5, 'minutes').toISOString();
    this.fin= moment(this.data[0].time).add(5, 'minutes').toISOString();

    

    // Add X axis
    this.x = d3.scaleTime()
      .domain(d3.extent(
        [
          d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(this.inicio),
          d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(this.fin)
        ],
        (d) => { return d; }))
      .range([0, this.width]);

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x)).style("font-size", 15);
    // Add Y axis
    this.y = d3.scaleLinear()
      .domain([0, this.altoEjeY])
      .range([this.height, 0]);
    this.svg.append("g")
      .call(d3.axisLeft(this.y)).style("font-size", 13);
  }

  addLines() {
    var line = d3.line()
      .x((d) => {
        const time2 = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.time);
        return this.x(time2)
      })
      .y((d) => { return this.y(d.value) })
    this.svg.selectAll("myLines")
      .data(this.dataReady)
      .enter()
      .append("path")
      .attr("d", (d) => { return line(d.values) })
      .attr("stroke", (d) => {
        return this.myColor(d.name)
      })
      .style("stroke-width", 1)
      .style("fill", "none")
  }



  addPoints() {
    this.svg
      // First we need to enter in a group
      .selectAll("myDots")
      .data(this.dataReady)
      .enter()
      .append('g')
      .style("fill", (d) => { return this.myColor(d.name) })
      .selectAll("myPoints") // Second we need to enter in the 'values' part of this group
      .data((d) => { return d.values })
      .enter()
      .append("circle")
      .attr("cx", (d) => {
        const time2 = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.time);
        return this.x(time2)
      })
      .attr("cy", (d) => { return this.y(d.value) })
      .attr("r", 4)
      .attr("stroke", "white")
  }

  addLabels() {
    this.svg
      // First we need to enter in a group
      .selectAll("a")
      .data(this.dataReady)
      .enter()
      .append('g')
      .style("fill", (d) => {
        return this.myColor(d.name)
      })
      .selectAll("b") // Second we need to enter in the 'values' part of this group
      .data((d) => { return d.values })
      .enter()
      .append("text")
      .attr("transform", (d) => {
        //console.log(d);
        return "translate(" + this.x(d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.time))
          + "," + this.y(d.value) + ")";
      }) // Put the text at the position of the last point
      .attr("x", 0) // shift the text a bit more right
      .attr("y", -11)
      .text((d) => {
        return '' + d.value + ' '
      })
      // .style("fill", (d) => { return d.name })
      .style("font-size", this.tamagnoFuente)



  }

  leyenEndline() {
    this.svg
      .selectAll("myLabels")
      .data(this.dataReady)
      .enter()
      .append('g')
      .append("text")
      .datum((d) => {
        return { name: d.name, value: d.values[ /*d.values.length - 1*/ 0] };
      }) // keep only the last value of each time series
      .attr("transform", (d) => {
        return "translate(" + this.x(d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.value.time))
          + "," + this.y(d.value.value) + ")";
      }) // Put the text at the position of the last point
      .attr("x", 40) // shift the text a bit more right
      .attr("y", -1)
      .text((d) => {
        return '' + d.name + ' '
      })
      .style("fill", (d) => { return this.myColor(d.name) })
      .style("font-size", this.tamagnoFuente)
  }



 //------------------------------------------------------------ 

 existe(valor: any){
    return  this.marcdos.indexOf(valor) !== -1? true : false; 
  }




  async casillasVerificacion(){
    this.marcdos  =  await this.mensajeAlerta.presentAlertCheckbox("Parámetros", this.elementos);
    this.elementos[0].checked = this.existe('CO2');
    this.elementos[1].checked = this.existe('temp');
    this.elementos[2].checked = this.existe('humid');
    this.elementos[3].checked = this.existe('press');
    this.elementos[4].checked = this.existe('noise');
    this.elementos[5].checked = this.existe('texto');
    this.mostrarTexto = this.existe('texto');

   
    this.allGroup = this.marcdos.filter( (valor)  => valor !== 'texto')
    this.borraGrafica();
    this.inicarGrafica();
 }


  private marcdos: any = [];
  public elementos:any = [
    {
      name: 'checkbox0',
      type: 'checkbox',
      label: 'CO2',
      value: 'CO2',
      checked: true,
    },
    {
      name: 'checkbox1',
      type: 'checkbox',
      label: 'Temperatura',
      value: 'temp',
      checked: true
    },
    {
      name: 'checkbox2',
      type: 'checkbox',
      label: 'Humedad',
      value: 'humid',
      checked: true
    },
    {
      name: 'checkbox3',
      type: 'checkbox',
      label: 'Presión',
      value: 'press',
      checked: true
    },
    {
      name: 'checkbox4',
      type: 'checkbox',
      label: 'Ruido',
      value: 'noise',
      checked: true
    },
    {
      name: 'checkbox5',
      type: 'checkbox',
      label: 'Texto',
      value: 'texto',
      checked: true
    },

  ]


  cambiarTamagnoletra(event){
     this.tamagnoFuente = event.target.value;
      this.borraGrafica();
      this.inicarGrafica();
  }

}
