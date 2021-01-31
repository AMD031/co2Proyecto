
import { Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import * as moment from 'moment';
// import * as d3 from 'd3-selection';
// import * as d3Scale from 'd3-scale';
// import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3TimeFormat from 'd3-time-format';
import * as d3 from "d3";

@Component({
  selector: 'app-vistagrafica',
  templateUrl: './vistagrafica.component.html',
  styleUrls: ['./vistagrafica.component.scss'],
})
export class VistagraficaComponent  {
  @Input('data') data:any = [];
  @Input('nueva')nueva:boolean
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;
  myColor: any;
  dataReady: any = [];
  // public data = [
  //   {
  //     "id": 20456,
  //     "station": "aulatest 1",
  //     "data": {
  //       "CO2": 489,
  //       "temp": 16,
  //       "humid": 43,
  //       "press": 957,
  //       "noise": 117
  //     },
  //     "time": "2021-01-30T12:42:50.269Z"
  //   },
  //   {
  //     "id": 20452,
  //     "station": "aulatest 1",
  //     "data": {
  //       "CO2": 493,
  //       "temp": 15,
  //       "humid": 43,
  //       "press": 948,
  //       "noise": 126
  //     },
  //     "time": "2021-01-30T12:37:49.490Z"
  //   },
  //   {
  //     "id": 20448,
  //     "station": "aulatest 1",
  //     "data": {
  //       "CO2": 495,
  //       "temp": 16,
  //       "humid": 42,
  //       "press": 949,
  //       "noise": 133
  //     },
  //     "time": "2021-01-30T12:32:48.809Z"
  //   },
  //   {
  //     "id": 20444,
  //     "station": "aulatest 1",
  //     "data": {
  //       "CO2": 494,
  //       "temp": 16,
  //       "humid": 42,
  //       "press": 946,
  //       "noise": 126
  //     },
  //     "time": "2021-01-30T12:27:48.060Z"
  //   },
  //   {
  //     "id": 20440,
  //     "station": "aulatest 1",
  //     "data": {
  //       "CO2": 494,
  //       "temp": 17,
  //       "humid": 43,
  //       "press": 945,
  //       "noise": 121
  //     },
  //     "time": "2021-01-30T12:22:46.963Z"
  //   },
  //   {
  //     "id": 20436,
  //     "station": "aulatest 1",
  //     "data": {
  //       "CO2": 498,
  //       "temp": 17,
  //       "humid": 44,
  //       "press": 942,
  //       "noise": 113
  //     },
  //     "time": "2021-01-30T12:17:46.233Z"
  //   },
  //   {
  //     "id": 20432,
  //     "station": "aulatest 1",
  //     "data": {
  //       "CO2": 488,
  //       "temp": 18,
  //       "humid": 43,
  //       "press": 938,
  //       "noise": 118
  //     },
  //     "time": "2021-01-30T12:12:45.536Z"
  //   },
  //   {
  //     "id": 20428,
  //     "station": "aulatest 1",
  //     "data": {
  //       "CO2": 498,
  //       "temp": 19,
  //       "humid": 42,
  //       "press": 937,
  //       "noise": 120
  //     },
  //     "time": "2021-01-30T12:07:44.759Z"
  //   },
  //   {
  //     "id": 20424,
  //     "station": "aulatest 1",
  //     "data": {
  //       "CO2": 489,
  //       "temp": 18,
  //       "humid": 42,
  //       "press": 943,
  //       "noise": 114
  //     },
  //     "time": "2021-01-30T12:02:44.066Z"
  //   },
  //   {
  //     "id": 20420,
  //     "station": "aulatest 1",
  //     "data": {
  //       "CO2": 497,
  //       "temp": 18,
  //       "humid": 42,
  //       "press": 939,
  //       "noise": 105
  //     },
  //     "time": "2021-01-30T11:57:43.353Z"
  //   }
  // ]

  
  //  "CO2": 498,
  //   "temp": 14,
  //   "humid": 42,
  //   "press": 968,
  //   "noise": 111


  private allGroup: any = ["CO2", "temp", "humid", "press", "noise"];

  constructor() {
    this.width = 800 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
  }



  ngOnInit(): void {
    // console.log("datos:"+ JSON.stringify(this.data));
      this.initSvg();
      this.reformatData();
      this.colorScale();
      this.initAxis();
      this.addLines();
      this.addPoints();
      this.addLabels();
      this.leyenEndline();

  }


  initSvg() {
    if(!this.nueva){
      this.svg = d3.select(".linealChart")
      .append("svg")
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 400')
      .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");
    }else{
      this.svg = d3.select(".linealChart2")
      .append("svg")
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 400')
      .append("g")
      .attr("transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")");
    }
   
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
    console.log(this.dataReady);
  }

  colorScale() {
    this.myColor = d3.scaleOrdinal()
      .domain(this.allGroup)
      .range(d3.schemeSet2);
    //  .range( ["#FAA","#00F"]);
  }


  initAxis() {
    const fin: string = moment(this.data[0].time).add(2, 'minutes').toISOString();
    const inicio: string = moment(this.data[this.data.length - 1].time).subtract(2, 'minutes').toISOString();
    this.x = d3.scaleTime()
      .domain(d3.extent(
        [
          d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(inicio),
          d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ")(fin)
        ],
        (d) => { return d; }))
      .range([0, this.width]);

    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x));

    // Add Y axis
    this.y = d3.scaleLinear()
      .domain([0, 1200])
      .range([this.height, 0]);
    this.svg.append("g")
      .call(d3.axisLeft(this.y));
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
        return this.myColor(d.name) })
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
      .attr("y", -2)
      .text((d) => {  
        return '' + d.value + ' '
      })
      .style("fill", (d) => { return '#000000' })
      .style("font-size", 10)



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
      .style("font-size", 8)
  }

 

}
