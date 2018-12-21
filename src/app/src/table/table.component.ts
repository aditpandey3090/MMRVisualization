import { Component, OnInit,Input } from '@angular/core';
import {SelectionService} from '../selectionService/selection.service'
import * as ttest from "ttest"

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers:[]
})
export class TableComponent implements OnInit {
  @Input() private data: Array<any>;
  chartVisible:boolean

  constructor(public selection:SelectionService)
  {
    this.chartVisible=false
  }

  ngOnInit()
  {
    this.createChart(this.data);
    console.log(this.data)
  }

  createChart(data)
  {
    //console.log(data) THis sorts the input data that is coming from the main component, you don't want that to happen,so create a
    //local variable to create the table that can be sorted in diffrent ways
    //this.chartVisible=true

  }



  //This function takes input a row of data to highlight
  rowClick(data:any):void
  {
    this.selection.selectValue([data])
  }






}
