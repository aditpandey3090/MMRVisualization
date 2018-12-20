"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var d3 = require("d3");
var BarchartC = (function () {
    function BarchartC() {
        this.margin = { top: 20, bottom: 20, left: 30, right: 20 };
    }
    BarchartC.prototype.ngOnInit = function () {
        this.createChart(this.data);
    };
    BarchartC.prototype.drawParallelCoordinate = function (data) {
        this.createChart(this.data);
    };
    BarchartC.prototype.createChart = function (data) {
        var _this = this;
        console.log("Are we really coming here");
        console.log(this.data);
        var element = this.visContainer.nativeElement;
        this.width = window.screen.width / 2 - this.margin.left - this.margin.right;
        this.height = window.screen.height / 2 - this.margin.top - this.margin.bottom;
        console.log(element.clientHeight);
        var svg = d3.select(element).select("svg")
            .attr('width', window.screen.width / 2)
            .attr('height', window.screen.height / 2);
        //chart plot area
        // this.chart = svg.select(".bars")
        //   .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
        // define X & Y domains
        var xDomain = this.data.map(function (d) { return d.workerid; });
        console.log(xDomain);
        var yDomain = [0, d3.max(this.data, function (d) { return d.accuracy; })];
        // create scales
        this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
        this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
        // bar colors
        this.colors = d3.scaleLinear().domain([0, this.data.length]).range(['red', 'blue']);
        // x & y axis
        this.xAxis = d3.select(".axis-x").attr('transform', "translate(" + this.margin.left + ", " + (this.margin.top + this.height) + ")").call(d3.axisBottom(this.xScale));
        this.xAxis.selectAll("text").text(function (d, i) { return "P" + i; });
        this.xAxis = d3.select(".axis-y").attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")").call(d3.axisLeft(this.yScale));
        // this.xAxis = svg.append('g')
        //   .attr('class', 'axis axis-x')
        //   .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
        //   .call(d3.axisBottom(this.xScale));
        // this.yAxis = svg.append('g')
        //   .attr('class', 'axis axis-y')
        //   .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
        //   .call(d3.axisLeft(this.yScale));
        //drawing bar colors
        this.bars = svg.append("g").attr("class", "bars").selectAll("rect").data(this.data)
            .enter().append("rect")
            .attr("x", function (d) {
            return _this.xScale(d.workerid) + _this.margin.left;
        })
            .attr("y", function (d) { return _this.yScale(d.accuracy) + _this.margin.top; })
            .attr("width", this.xScale.bandwidth())
            .attr("height", function (d) { return _this.height - _this.yScale(d.accuracy); })
            .attr("fill", "steelblue");
    };
    return BarchartC;
}());
__decorate([
    core_1.ViewChild('visContainer')
], BarchartC.prototype, "visContainer", void 0);
__decorate([
    core_1.Input()
], BarchartC.prototype, "data", void 0);
BarchartC = __decorate([
    core_1.Component({
        selector: 'app-barchart',
        templateUrl: 'barchart.component.html',
        styleUrls: ['barchart.component.css']
    })
], BarchartC);
exports.BarchartC = BarchartC;
