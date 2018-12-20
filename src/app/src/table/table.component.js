"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ttest = require("ttest");
var TableComponent = (function () {
    function TableComponent() {
        this.chartVisible = false;
    }
    TableComponent.prototype.ngOnInit = function () {
        this.createChart(this.data);
        console.log(this.data);
        var females = [];
        var males = [];
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].sex == "Male") {
                males.push(this.data[i].accuracy);
            }
            else {
                females.push(this.data[i].accuracy);
            }
        }
        var val = ttest(males, females);
        console.log(val.pValue());
    };
    TableComponent.prototype.createChart = function (data) {
        console.log("confused");
        //console.log(data) THis sorts the input data that is coming from the main component, you don't want that to happen,so create a
        //local variable to create the table that can be sorted in diffrent ways
        this.data.sort(function (t1, t2) {
            if (t1.accuracy > t2.accuracy) {
                return 1;
            }
            if (t1.accuracy < t2.accuracy) {
                return -1;
            }
            return 0;
        });
        //this.chartVisible=true
    };
    return TableComponent;
}());
__decorate([
    core_1.Input()
], TableComponent.prototype, "data", void 0);
TableComponent = __decorate([
    core_1.Component({
        selector: 'app-table',
        templateUrl: './table.component.html',
        styleUrls: ['./table.component.css']
    })
], TableComponent);
exports.TableComponent = TableComponent;
