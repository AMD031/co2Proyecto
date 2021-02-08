
import { Component, Input, Output, EventEmitter } from '@angular/core';
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
import { UtilesService } from 'src/app/services/utiles.service';



@Component({
  selector: 'app-vistagrafica',
  templateUrl: './vistagrafica.component.html',
  styleUrls: ['./vistagrafica.component.scss'],
})
export class VistagraficaComponent {

  @Output() messageEvent = new EventEmitter<string>();
  //@Input('data') data:any = [];
  @Input('nombre') nombre: string;
  @Input('pagina') pagina: number;
  @Input('mostarApmpliar') mostarApmpliar: number;

  width: number;
  height: number;
  margin = { top: 0, right: 1, bottom: 7, left: 0 };
  x: any;
  y: any;
  svg: any;
  g: any;
  myColor: any;
  dataReady: any = [];
  data: any = [];
  page: number = 1;
  mostrarTexto: boolean = true;
  mostrarLeyenda: boolean = true;
  tamagnoFuente: number = 15;
  ob$: Subscription;
  altoEjeY: number = 1250;
  inicio: string;
  fin: string;
  mostrar: boolean = true;
  zoom: any;
  Tooltip: any;

  transform: any;

  gx: any;
  gy: any;

  xAxis: any;
  yAxis: any;

  tamagnoPunto: any = 3;
  private allGroup: any = ["CO2" /*, "temp", "humid", "press", "noise"*/];

  constructor(
    private store: Store<AppState>,
    private mensajeAlerta: MensajesalertasService,
    private utirl: UtilesService
  ) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }
  sendMessage() {
    this.messageEvent.emit("amplia");
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




  borraGrafica() {
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
      console.log('error');

    }

  }

  ngOnInit(): void {
    this.iniciarCarga();
  }




  private inicarGrafica() {
    this.initSvg();
    this.addRectangle();
    this.reformatData();
    this.colorScale();
    this.initAxis();
    this.addAxis();
    this.addLines();
    this.addPoints();
    this.mostrarTexto && this.addLabels();
    this.mostrarLeyenda && this.leyenEndline();
    this.addToolTip();
    this.mostrarLeyenda && this.addIcons();

  }

  addRectangle(): void {
    // margin = { top: 20, right: 20, bottom: 30, left: 50 };
    this.svg.append("rect")
      .attr("width", 65)
      .attr("height", 30)
      //.style("fill", "none")
      //.style("pointer-events", "all")
      .attr('transform', 'translate(' + (834 - this.margin.left) + ',' + (this.margin.top - 2) + ')')
      .style("fill", "white")
      .style("stroke", "gray")
      .style("stroke-width", "1px");

  }


  corrigirPosicion(): void {
    this.transform && this.svg.selectAll(".charts")
      .attr("transform", this.transform);

    this.transform && this.svg.selectAll(".icono")
      .attr("transform", this.transform);


  }

  zoomed(/*{ transform } */ event): void {
    // this.g.attr("transform", transform);
    const { transform } = event;



    this.transform = transform;

    this.transform && this.svg.selectAll(".charts")
      .attr("transform", transform);

      this.transform && this.svg.selectAll(".icon")
      .attr("transform", transform);
    


    d3.selectAll('.line').style("stroke-width", 2 / transform.k);
    this.gx.call(this.xAxis.scale(transform.rescaleX(this.x)));
    this.gy.call(this.yAxis.scale(transform.rescaleY(this.y)));

  }

  addToolTip(): void {
    this.Tooltip = d3.select(".linealChart")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

  }



  initSvg(): void {

    this.svg = d3.select(".linealChart")
      .append("svg")
      //.attr("preserveAspectRatio", "xMinYMin meet")
      .attr('width', '95%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${900} ${400}`)
      //.classed("svg-content", true)
      .call(d3.zoom()
        .extent([[0, 0], [this.width, this.height]])
        .scaleExtent([0.75, 8])
        .on("zoom", (event, d) => {
          return this.zoomed(event)
        }
        ));



    this.g = this.svg.append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");


  }

  reformatData(): void {
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

  colorScale(): void {
    this.myColor = d3.scaleOrdinal()
      .domain(this.allGroup)
      .range(d3.schemeSet2);
      //.range( ["grey","orange","black", "red", "blue"]); 
  }


  initAxis(): void {

    this.inicio = moment(this.data[this.data.length - 1].time).toISOString();
    this.fin = moment(this.data[0].time).toISOString();
    const inicioMargen = moment(this.data[this.data.length - 1].time).subtract(5, 'minutes').toISOString();
    const finMargen = moment(this.data[0].time).add(10, 'minutes').toISOString();


    // Add X axis
    this.x = d3.scaleTime()
      .domain(d3.extent(
        [
          d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(inicioMargen),
          d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(finMargen)
        ],
        (d) => { return d; }))
      .range([0, this.width]);



    // Add Y axis
    this.y = d3.scaleLinear()
      .domain([0, this.altoEjeY])
      .range([this.height, 0]);



  }


  addAxis(): void {
    this.gx = this.g.append("g")
      .attr("transform", "translate(0," + 0 + ")")
      .call(d3.axisBottom(this.x)).style("font-size", 20)



    this.gy = this.g.append("g")
      .attr("transform", `translate(${this.width},` + 0 + ")")
      .call(d3.axisLeft(this.y)).style("font-size", 20)


    //-----------------
    this.xAxis = d3.axisBottom(this.x);
    this.yAxis = d3.axisLeft(this.y)
  }

  addLines(): void {
    var line = d3.line()
      .x((d) => {
        const time2 = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.time);
        return this.x(time2)
      })
      .y((d) => { return this.y(d.value) })

    this.g
      .selectAll("myLines")
      .data(this.dataReady)
      .enter()
      .append("path")
      .attr("class", "charts")
      .attr("d", (d) => { return line(d.values) })
      .attr("stroke", (d) => {
        return this.myColor(d.name)
      })
      .style("stroke-width", 1)
      .style("fill", "none")
  }



  addPoints(): void {
    this.g
      // First we need to enter in a group
      .selectAll("myDots")
      .data(this.dataReady)
      .enter()
      .append('g')
      .attr("class", "charts")
      .style("fill", (d) => { return this.myColor(d.name) })
      .selectAll("myPoints") // Second we need to enter in the 'values' part of this group
      .data((d) => {
        const valores = d.values.map(
          (valor) => {
            return { ...valor, name: d.name }
          }
        )
        return valores
      })
      .enter()
      .append("circle")
      .attr("class", "myCircle")
      .attr("cx", (d) => {
        const time2 = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.time);
        return this.x(time2)
      })
      .attr("cy", (d) => { return this.y(d.value) })
      .attr("r", this.tamagnoPunto)
      .attr("stroke", "white")
      .on("mouseover", (event, d) => this.mouseover(event, d))
      .on("mousemove", (event, d) => this.mousemove(event, d, d.name))
      .on("mouseleave", (event, d) => this.mouseleave(event, d))
  }





  // Three function that change the tooltip when user hover / move / leave a cell
  mouseover(event, d): void {
    this.Tooltip
      .style("opacity", 1)

  }

  mousemove(event: any, d: any, name: any): void {
    //console.log(d3.pointer(event));
    //d3.pointer()
    //console.log(d3.select(event.target).attr("stroke"));
    this.Tooltip
      .html(
        '<div style="text-align: left;">' +
        '<img src="assets/img/co2.svg" class="tamagnoImg">'+
        '<b>' + name + ': ' + '</b>' + d.value + '<br>' +
        '<b>' + "Fecha: " + '</b>' + d.time +
        '</div>'

      )
      // .style("top", d3.select(event.target).attr("cy")+ 70+ 'px')
      // .style("left",  d3.select(event.target).attr("cx")+ 'px')
      .style("top", '10%')
      .style("left", '10%')

    d3.select(event.target).style("stroke", "black")

    // console.log(d3.select(event.target));





  }

  mouseleave(event, d): void {


    this.Tooltip
      .transition()
      .duration(500)
      .style("opacity", 0);

    d3.select(event.target).style("stroke", "white")
  }



  addLabels(): void {
    this.g
      // First we need to enter in a group
      .selectAll("a")
      .data(this.dataReady)
      .enter()
      .append('g')
      .attr("class", "charts")
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

  leyenEndline(): void {

    this.g
      .selectAll("myLabels")
      .data(this.dataReady)
      .enter()
      .append('g')
      .attr("class", "charts")
      .append("text")
      .datum((d) => {
        return { name: d.name, value: d.values[ /*d.values.length - 1*/ 0] };
      }) // keep only the last value of each time series
      .attr("transform", (d) => {
        return "translate(" + this.x(d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.value.time))
          + "," + this.y(d.value.value) + ")";
      }) // Put the text at the position of the last point
      .attr("x", 90) // shift the text a bit more right
      .attr("y", -1)
      .text((d) => {
        return '' + d.name + ' '
      })
      .style("fill", (d) => { return this.myColor(d.name) })
      .style("font-size", this.tamagnoFuente)
  }


  addIcons(){
    

    this.g
    .selectAll("icons")
    .data(this.dataReady)
    .enter()
    .append('g')
    .attr("class", "icon")
    .append("svg:image")
    .datum((d) => {
      return { name: d.name, value: d.values[ /*d.values.length - 1*/ 0] };
    }) // keep only the last value of each time series
    .attr("transform", (d) => {
      return "translate(" + this.x(d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.value.time))
        + "," + this.y(d.value.value) + ")";
    }) // Put the text at the position of the last point
    .attr( 
       "xlink:href", (d) => { return this.utirl.devolverIcono(d.name) })
    .attr('x', 30)
    .attr('y', -20)
    .attr("width", 50)
    .attr("height", 50)
    .append("text")
      .attr("x", 10) // shift the text a bit more right
     .attr("y", -1)
 
  }


  //------------------------------------------------------------ 

  existe(valor: any): boolean {
    return this.marcdos.indexOf(valor) !== -1 ? true : false;
  }


  async casillasVerificacion(): Promise<void> {
    this.marcdos = await this.mensajeAlerta.presentAlertCheckbox("Parámetros", this.elementos);
    this.elementos[0].checked = this.existe('CO2');
    this.elementos[1].checked = this.existe('temp');
    this.elementos[2].checked = this.existe('humid');
    this.elementos[3].checked = this.existe('press');
    this.elementos[4].checked = this.existe('noise');
    this.elementos[5].checked = this.existe('texto');
    this.elementos[6].checked = this.existe('leyenda');
    this.mostrarTexto = this.existe('texto');
    this.mostrarLeyenda = this.existe('leyenda');

    this.allGroup = this.marcdos.filter((valor) => valor !== 'texto' &&  valor !== 'leyenda');
  
    this.borraGrafica();
    this.inicarGrafica();
  }


  private marcdos: any = [];
  public elementos: any = [
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
      checked: false
    },
    {
      name: 'checkbox2',
      type: 'checkbox',
      label: 'Humedad',
      value: 'humid',
      checked: false
    },
    {
      name: 'checkbox3',
      type: 'checkbox',
      label: 'Presión',
      value: 'press',
      checked: false
    },
    {
      name: 'checkbox4',
      type: 'checkbox',
      label: 'Ruido',
      value: 'noise',
      checked: false
    },
    {
      name: 'checkbox5',
      type: 'checkbox',
      label: 'Texto',
      value: 'texto',
      checked: true
    },
    {
      name: 'checkbox6',
      type: 'checkbox',
      label: 'Leyenda',
      value: 'leyenda',
      checked: true
    },

  ]

  borraTexto(): void {
    d3.selectAll("svg > g > g> text").remove();
  }

  borrarPath(): void {
    d3.selectAll("svg > g > path").remove();
  }

  borrarPutos(): void {
    d3.selectAll("svg > g > g> circle").remove();
  }

  cambiarTamagnoPuntos(event) {
    this.tamagnoPunto = event.target.value;
    this.borrarPutos();
    this.addPoints();
    this.corrigirPosicion();
  }





  cambiarTamagnoletra(event): void {
    this.tamagnoFuente = event.target.value;
    this.borraTexto();
    this.addLabels();
    this.leyenEndline();
    this.corrigirPosicion();
    // this.borraGrafica();
    // this.inicarGrafica();
  }

}
