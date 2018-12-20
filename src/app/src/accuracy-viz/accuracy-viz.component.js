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
var AccuracyVizComponent = (function () {
    function AccuracyVizComponent() {
        this.margin = { top: 20, bottom: 20, left: 30, right: 20 };
        this.accuracyList = [];
        this.workerList = [];
        this.vizData = [];
        this.stimuliList = [];
        this.colorList = [];
        this.stimuliSet = ['true-true-true', 'true-true-false', 'true-false-true', 'false-true-true', 'false-false-true', 'false-true-false', 'true-false-false'];
        this.inputBoxStimuli = false;
    }
    AccuracyVizComponent.prototype.ngOnInit = function () {
        this.createChart(this.data);
    };
    AccuracyVizComponent.prototype.createChart = function (data) {
        var _this = this;
        var accuracyData = data;
        for (var i = 0; i < accuracyData.length; i++) {
            //this.workers.push(accuracyData[i].workerid)
            var response = JSON.parse(accuracyData[i].response);
            var truelabels = JSON.parse(accuracyData[i].truelabel);
            this.accuracyList.push(this.matchInstances(response, truelabels));
            this.workerList.push(accuracyData[i].workerid);
            this.stimuliList.push(JSON.parse(accuracyData[i].stimuli));
        }
        console.log(this.stimuliList);
        for (var i = 0; i < this.accuracyList.length; i++) {
            for (var j = 0; j < 100; j++) {
                var cellValue = {
                    index: j + 1,
                    workerid: this.workerList[i],
                    value: this.accuracyList[i][j],
                    stimuli: this.stimuliList[i][j]
                };
                this.vizData.push(cellValue);
            }
        }
        console.log(this.vizData);
        var element = this.visContainer.nativeElement;
        this.width = window.innerWidth - this.margin.left - this.margin.right;
        this.height = window.innerHeight / 1.5 - this.margin.top - this.margin.bottom;
        console.log(element.clientHeight);
        var svg = d3.select(element).append('svg')
            .attr('width', window.innerWidth)
            .attr('height', window.innerHeight / 1.5);
        // define X & Y domains
        var xDomain = d3.set(this.vizData.map(function (item) {
            return item.index;
        })).values();
        var yDomain = d3.set(this.vizData.map(function (item) {
            return item.workerid;
        })).values();
        var stimuliColorDomain = d3.set(this.vizData.map(function (item) {
            return item.stimuli;
        })).values();
        //this.stimuliSet=stimuliColorDomain
        this.xScale = d3.scaleBand().padding(0.5).domain(xDomain).rangeRound([0, this.width]);
        this.xAxis = svg.append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', "translate(" + this.margin.left + ", " + (this.margin.top + this.height) + ")")
            .call(d3.axisBottom(this.xScale));
        this.yScale = d3.scaleBand().padding(0.5).domain(yDomain).rangeRound([0, this.height]);
        this.yAxis = svg.append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")")
            .call(d3.axisLeft(this.yScale))
            .selectAll("text").text(function (d, i) {
            return "P" + i;
        });
        ;
        this.colorScale = d3.scaleOrdinal().domain(this.stimuliSet).range(d3.schemeCategory10);
        this.colorList = d3.schemeCategory10;
        console.log(this.colorList);
        this.colorScaleAccuracy = d3.scaleOrdinal().domain([0, 1]).range(["#F88379", "#B0E0E6"]);
        this.cell = svg.append("g").attr("class", "cells").selectAll("rect").data(this.vizData)
            .enter().append("rect")
            .attr("x", function (d) {
            return _this.xScale(d.index) + _this.margin.left;
        })
            .attr("y", function (d) { return _this.yScale(d.workerid) + _this.margin.top; })
            .attr("width", this.xScale.bandwidth())
            .attr("height", this.yScale.bandwidth())
            .attr("fill", function (d) {
            return _this.colorScaleAccuracy(d.value);
        })
            .attr("class", function (d) {
            return d.stimuli;
        })
            .attr("id", "heatmapcells")
            .attr("rx", function (d) {
            if (d.value == 0) {
                return "50%";
            }
            else {
                return 0;
            }
        })
            .attr("ry", function (d) {
            if (d.value == 0) {
                return "30%";
            }
            else {
                return 0;
            }
        });
    };
    AccuracyVizComponent.prototype.matchInstances = function (a, b) {
        var matches = [];
        if (a.length == b.length) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] == b[i]) {
                    matches.push(1);
                }
                else {
                    matches.push(0);
                }
            }
        }
        else {
            for (var i = 0; i < a.length; i++) {
                matches.push(-1);
            }
        }
        return matches;
    };
    AccuracyVizComponent.prototype.filterByStimuli = function (event) {
        d3.selectAll("#heatmapcells").style("opacity", 0);
        console.log("." + event.srcElement.innerHTML.trim());
        d3.selectAll("." + event.srcElement.innerHTML.trim()).style("opacity", 1);
    };
    AccuracyVizComponent.prototype.filterByTypeOfResponse = function (event) {
        if (event.srcElement.tagName == "circle") {
            var element = this.visContainer.nativeElement;
            var elements = d3.select(element).selectAll("rect")._groups[0];
            //let elements=document.getElementsByTagName("rect")
            console.log(elements);
            for (var i = 0; i < this.vizData.length; i++) {
                if (this.vizData[i].value != 0) {
                    elements[i].style.fillOpacity = "0";
                }
            }
        }
        else {
            var element = this.visContainer.nativeElement;
            var elements = d3.select(element).selectAll("#heatmapcells")._groups[0];
            //let elements=document.getElementsByTagName("rect")
            console.log(elements);
            for (var i = 0; i < this.vizData.length; i++) {
                if (this.vizData[i].value != 1) {
                    elements[i].style.fillOpacity = "0";
                }
            }
        }
    };
    AccuracyVizComponent.prototype.reset = function () {
        console.log("this");
        var element = this.visContainer.nativeElement;
        var elements = d3.select(element).selectAll("rect")._groups[0];
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.fillOpacity = "1";
            elements[i].style.opacity = "1";
        }
    };
    AccuracyVizComponent.prototype.dummyFunction = function (event) {
        this.inputBoxStimuli = !this.inputBoxStimuli;
        if (this.inputBoxStimuli) {
            var element = this.visContainer.nativeElement;
            var elements = d3.select(element).selectAll("rect")._groups[0];
            for (var i = 0; i < this.vizData.length; i++) {
                elements[i].setAttribute("fill", this.colorScale(this.vizData[i].stimuli));
            }
        }
        else {
            var element = this.visContainer.nativeElement;
            var elements = d3.select(element).selectAll("rect")._groups[0];
            for (var i = 0; i < this.vizData.length; i++) {
                elements[i].setAttribute("fill", this.colorScaleAccuracy(this.vizData[i].value));
            }
        }
    };
    return AccuracyVizComponent;
}());
__decorate([
    core_1.ViewChild('visContainer')
], AccuracyVizComponent.prototype, "visContainer", void 0);
__decorate([
    core_1.Input()
], AccuracyVizComponent.prototype, "data", void 0);
AccuracyVizComponent = __decorate([
    core_1.Component({
        selector: 'app-accuracy-viz',
        templateUrl: './accuracy-viz.component.html',
        styleUrls: ['./accuracy-viz.component.css']
    })
], AccuracyVizComponent);
exports.AccuracyVizComponent = AccuracyVizComponent;
