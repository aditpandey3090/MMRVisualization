import { Component, OnInit, Input,ViewChild,ElementRef } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-accuracy-viz',
  templateUrl: './accuracy-viz.component.html',
  styleUrls: ['./accuracy-viz.component.css']
})
export class AccuracyVizComponent implements OnInit {
  @ViewChild('visContainer') private visContainer: ElementRef;
  @Input() private data: Array<any>;
  public workers: string[]
  private margin: any = {top: 20, bottom: 20, left: 30, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private accuracyList = []
  private workerList = []
  private vizData = []
  stimuliList = []
  private xScale: any
  private yScale: any
  private cell: any
  private colorScale: any
  private xAxis: any;
  private yAxis: any;
  colorList = []
  stimuliSet = ['true-true-true', 'true-true-false', 'true-false-true', 'false-true-true', 'false-false-true', 'false-true-false', 'true-false-false']
  private inputBoxStimuli = false
  private colorScaleAccuracy:any;

  constructor() {
  }

  ngOnInit() {
    this.createChart(this.data)
  }

  createChart(data) {
    let accuracyData = data;

    for (let i = 0; i < accuracyData.length; i++) {
      //this.workers.push(accuracyData[i].workerid)
      let response = JSON.parse(accuracyData[i].response);
      let truelabels = JSON.parse(accuracyData[i].truelabel);

      this.accuracyList.push(this.matchInstances(response, truelabels))
      this.workerList.push(accuracyData[i].workerid)
      this.stimuliList.push(JSON.parse(accuracyData[i].stimuli))

    }

    for (let i = 0; i < this.accuracyList.length; i++) {
      for (let j = 0; j < 100; j++) {
        let cellValue = {
          index: j + 1,
          workerid: this.workerList[i],
          value: this.accuracyList[i][j],
          stimuli: this.stimuliList[i][j]
        }

        this.vizData.push(cellValue)

      }
    }

    console.log(this.vizData)

    let element = this.visContainer.nativeElement;
    this.width = window.innerWidth - this.margin.left - this.margin.right;
    this.height = window.innerHeight / 1.5 - this.margin.top - this.margin.bottom;
    console.log(element.clientHeight)
    let svg = d3.select(element).append('svg')
      .attr('width', window.innerWidth)
      .attr('height', window.innerHeight / 1.5);

    // define X & Y domains
    let xDomain = d3.set(this.vizData.map(function (item) {
      return item.index;
    })).values();
    let yDomain = d3.set(this.vizData.map(function (item) {
      return item.workerid;
    })).values();
    let stimuliColorDomain = d3.set(this.vizData.map(function (item) {
      return item.stimuli;
    })).values();
    //this.stimuliSet=stimuliColorDomain

    this.xScale = d3.scaleBand().padding(0.5).domain(xDomain).rangeRound([0, this.width]);
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));

    this.yScale = d3.scaleBand().padding(0.5).domain(yDomain).rangeRound([0, this.height]);
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale))
      .selectAll("text").text((d, i) => {
        return "P" + i
      });
    ;

    this.colorScale = d3.scaleOrdinal().domain(this.stimuliSet).range(d3.schemeCategory10);
    this.colorList = d3.schemeCategory10
    console.log(this.colorList)
    this.colorScaleAccuracy = d3.scaleOrdinal().domain([0, 1]).range(["#F88379", "#B0E0E6"]);

    this.cell = svg.append("g").attr("class", "cells").selectAll("rect").data(this.vizData)
      .enter().append("rect")
      .attr("x", d => {
        return this.xScale(d.index) + this.margin.left
      })
      .attr("y", d => this.yScale(d.workerid) + this.margin.top)
      .attr("width", this.xScale.bandwidth())
      .attr("height", this.yScale.bandwidth())
      .attr("fill", d => {
        return this.colorScaleAccuracy(d.value)
      })
      .attr("class", d => {
        return d.stimuli
      })
      .attr("id", "heatmapcells")
      .attr("rx", d => {
        if (d.value == 0) {
          return "50%";
        }
        else {
          return 0;
        }
      })
      .attr("ry", d => {
        if (d.value == 0) {
          return "30%"
        }
        else {
          return 0;
        }
      });

  }


  matchInstances(a, b): number[] {
    let matches = []
    if (a.length == b.length) {
      for (let i = 0; i < a.length; i++) {
        if (a[i] == b[i]) {
          matches.push(1)
        }
        else {
          matches.push(0)
        }
      }

    }
    else {
      for (let i = 0; i < a.length; i++) {
        matches.push(-1)
      }
    }
    return matches
  }

  filterByStimuli(event) {
    d3.selectAll("#heatmapcells").style("opacity", 0)
    console.log("." + event.srcElement.innerHTML.trim())
    d3.selectAll("." + event.srcElement.innerHTML.trim()).style("opacity", 1)

  }

  filterByTypeOfResponse(event) {
    if (event.srcElement.tagName == "circle") {
      let element = this.visContainer.nativeElement
      let elements = d3.select(element).selectAll("rect")._groups[0]
      //let elements=document.getElementsByTagName("rect")
      console.log(elements)

      for (let i = 0; i < this.vizData.length; i++) {
        if (this.vizData[i].value != 0) {
          elements[i].style.fillOpacity = "0";
        }
      }

    }
    else {
      let element = this.visContainer.nativeElement
      let elements = d3.select(element).selectAll("#heatmapcells")._groups[0]
      //let elements=document.getElementsByTagName("rect")
      console.log(elements)

      for (let i = 0; i < this.vizData.length; i++) {
        if (this.vizData[i].value != 1) {
          elements[i].style.fillOpacity = "0";
        }
      }

    }
  }

  reset() {
    console.log("this")
    let element = this.visContainer.nativeElement
    let elements = d3.select(element).selectAll("rect")._groups[0]

    for (let i = 0; i < elements.length; i++) {

      elements[i].style.fillOpacity = "1";
      elements[i].style.opacity = "1";


    }
  }

  dummyFunction(event) {
    this.inputBoxStimuli = !this.inputBoxStimuli

    if (this.inputBoxStimuli) {
      let element = this.visContainer.nativeElement
      let elements = d3.select(element).selectAll("rect")._groups[0]

      for (let i = 0; i < this.vizData.length; i++) {

        elements[i].setAttribute("fill", this.colorScale(this.vizData[i].stimuli))

      }
    }

  else {

      let element = this.visContainer.nativeElement
      let elements = d3.select(element).selectAll("rect")._groups[0]

      for (let i = 0; i < this.vizData.length; i++) {

        elements[i].setAttribute("fill", this.colorScaleAccuracy(this.vizData[i].value))

      }
    }
}
}
