"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
require("rxjs/add/operator/map"); // we need to import this now
var barchart_component_1 = require("../../barchart/barchart.component");
var DashboardComponent = (function () {
    function DashboardComponent(_http, pcordinate) {
        var _this = this;
        this._http = _http;
        this.pcordinate = pcordinate;
        this.csvRecords = [];
        this.fileNames = ["Rect_rawdata1_Accuracy.json", "Rect_rawdata2_Accuracy.json", "Face_rawdata1_Accuracy.json", "Face_rawdata2_Accuracy.json", "TotemPole_rawdata1_Accuracy.json", "TotemPole_rawdata2_Accuracy.json", "Petal_rawdata1_Accuracy.json", "Petal_rawdata2_Accuracy.json", "Rectangle_Accuracy.json", "Petals_Accuracy.json", "TotemPole_Accuracy.json", "FaceData_Accuracy.json", "FaceScrambled_Accuracy.json", "TotemPoleScrambledV2_Accuracy.json"];
        this.selectedChart = "BarChart";
        this.tableView = false;
        this.barChart = true;
        this.accuracyViz = false;
        this.getDataObservable("./assets/Rectangle_Accuracy.json").subscribe(function (data) {
            console.log("I CANT SEE DATA HERE: ", data);
            //pcordinate.drawParallelCoordinate(data);
            //Listing out all measures in the data file
            _this.fields = Object.keys(data[0]);
            console.log(_this.fields);
            data.sort(function (t1, t2) {
                if (t1.accuracy > t2.accuracy) {
                    return 1;
                }
                if (t1.accuracy < t2.accuracy) {
                    return -1;
                }
                return 0;
            });
            _this.chartData = data;
            //this.chartData=data.filter(data => data.age >32)
        });
    }
    DashboardComponent.prototype.getDataObservable = function (url) {
        return this._http.get(url)
            .map(function (data) {
            data.json();
            // the console.log(...) line prevents your code from working
            // either remove it or add the line below (return ...)
            console.log("I CAN SEE DATA HERE: ", data.json());
            return data.json();
        });
    };
    //One way vs two way binding https://stackoverflow.com/questions/33700266/how-can-i-get-new-selection-in-select-in-angular-2
    DashboardComponent.prototype.selectBoxInput = function (deviceValue) {
        console.log(deviceValue);
        if (deviceValue == "BarChart") {
            this.tableView = false;
            this.accuracyViz = false;
            this.barChart = true;
            this.selectedChart = "BarChart";
        }
        if (deviceValue == "TableView") {
            this.barChart = false;
            this.accuracyViz = false;
            this.tableView = true;
            this.selectedChart = "TableView";
        }
        if (deviceValue == "AccuracyView") {
            this.barChart = false;
            this.tableView = false;
            this.accuracyViz = true;
            this.selectedChart = "AccuracyView";
        }
    };
    //Changing Filename through option box
    DashboardComponent.prototype.changeFile = function (value) {
        var _this = this;
        this.tableView = false;
        this.barChart = false;
        this.accuracyViz = false;
        this.getDataObservable("./assets/" + value).subscribe(function (data) {
            //Listing out all measures in the data file
            _this.fields = Object.keys(data[0]);
            console.log(_this.fields);
            data.sort(function (t1, t2) {
                if (t1.accuracy > t2.accuracy) {
                    return 1;
                }
                if (t1.accuracy < t2.accuracy) {
                    return -1;
                }
                return 0;
            });
            _this.chartData = data;
            _this.selectBoxInput(_this.selectedChart);
            //this.chartData=data.filter(data => data.age >32)
        });
    };
    DashboardComponent.prototype.selectVisualization = function (inputValue) {
    };
    DashboardComponent.prototype.ngOnInit = function () {
    };
    return DashboardComponent;
}());
__decorate([
    core_1.ViewChild('selectBox')
], DashboardComponent.prototype, "selectBox", void 0);
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'app-dashboard',
        templateUrl: './dashboard.component.html',
        styleUrls: ['./dashboard.component.css'],
        providers: [barchart_component_1.barchart]
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
