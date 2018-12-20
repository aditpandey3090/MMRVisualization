import { Component, OnInit,ElementRef,ViewChild,Input } from '@angular/core';
import {SelectionService} from '../selectionService/selection.service'
import * as d3 from 'd3';
import { Subscription }   from 'rxjs/Subscription';


@Component({
  selector: 'app-barchart',
  templateUrl: 'barchart.component.html',
  styleUrls: ['barchart.component.css'],
  providers:[]

})
export class BarchartComponent implements OnInit {
  @ViewChild('visContainer') private visContainer: ElementRef;
  @Input() private data: Array<any>;
  private margin: any = { top: 20, bottom: 20, left: 30, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private bars:any
  private element:any
  private svg:any

  constructor(public selection:SelectionService) {
  }

  ngOnInit() {
    this.element = this.visContainer.nativeElement;

    this.width = window.screen.width/2 - this.margin.left - this.margin.right;
    this.height = window.screen.height/2 - this.margin.top - this.margin.bottom;

    this.svg = d3.select(this.element).select("svg")
      .attr('width', window.screen.width/2)
      .attr('height', window.screen.height/2)
      .append("g");

    this.createChart(this.data)

    this.selection.selectedWorkerId.subscribe((value) => {

      console.log(value)
      this.createChart([value])


    });


  }

  createChart(data)
  {

    // define X & Y domains
    let xDomain = this.data.map(d => d.workerid);
    let yDomain = [0, d3.max(this.data, d => d.accuracy)];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis=d3.select(".axis-x").attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`).call(d3.axisBottom(this.xScale))
    this.xAxis.selectAll("text").text((d,i)  => {return "P"+i});
    this.xAxis=d3.select(".axis-y").attr('transform', `translate(${this.margin.left}, ${this.margin.top})`).call(d3.axisLeft(this.yScale));


    //drawing bar colors
    let bars=this.svg.selectAll("rect").data(data)
      .attr("x", d => {
        return this.xScale(d.workerid)+this.margin.left })
      .attr("y", d => this.yScale(d.accuracy)+this.margin.top)
      .attr("width", this.xScale.bandwidth())
      .attr("height", d =>  this.height-this.yScale(d.accuracy) )
      .attr("fill","steelblue");

    bars.enter().append("rect").attr("x", d => {
      return this.xScale(d.workerid)+this.margin.left })
      .attr("y", d => this.yScale(d.accuracy)+this.margin.top)
      .attr("width", this.xScale.bandwidth())
      .attr("height", d =>  this.height-this.yScale(d.accuracy) )
      .attr("fill","steelblue");

     bars.exit().remove();


  }








}
