import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';  // we need to import this now
import{BarchartComponent} from "../../barchart/barchart.component"
import{TableComponent} from "../../table/table.component"
import { GlobalFunctionsService } from '../../../global-functions.service';
import {SelectionService} from '../../selectionService/selection.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers:[BarchartComponent,GlobalFunctionsService,SelectionService]
})
export class DashboardComponent implements OnInit {

  fileImportInput: any;

  csvRecords = [];
  private chartData: any;
  private fields:Array<any>
  @ViewChild('selectBox') private selectBox: ElementRef;
  @ViewChild('selectBox') private selectBox1: ElementRef;

  tableView:boolean;
  barChart:boolean;
  accuracyViz:boolean
  PC:boolean
  public fileNames=["TotemPoleCond2.json","PetalCond2.json","FaceCond2.json","RectangleCond2.json","PetalCond1.json","TotemPoleCond1.json","RectangleCond1.json","FaceCond1.json","Face_RectFace_rawdata2_Accuracy.json","Rect_RectFace_rawdata1_Accuracy.json","Rect_TotemRect_rawdata2_Accuracy.json","Totem_TotemRect_rawdata1_Accuracy.json","Totem_RectTotem_rawdata2_Accuracy.json","Rect_RectTotem_rawdata1_Accuracy.json","Petal_TotemPetal_rawdata2_Accuracy.json","Totem_TotemPetal_rawdata1_Accuracy.json","Totem_PetalTotem_rawdata2_Accuracy.json","Petal_PetalTotem_rawdata1_Accuracy.json","Face_TotemFace_rawdata2_Accuracy.json","Totem_TotemFace_rawdata1_Accuracy.json","Totem_FaceTotem_rawdata2_Accuracy.json","Face_FaceTotem_rawdata1_Accuracy.json","Petal_RectPetal_rawdata2_Accuracy.json","Rect_RectPetal_rawdata1_Accuracy.json","Petal_PetalRect_rawdata1_Accuracy.json","Rect_PetalRect_rawdata2_Accuracy.json","Petal_PetalFace_rawdata1_Accuracy.json","Face_PetalFace_rawdata2_Accuracy.json","Face_FacePetal_rawdata1_Accuracy.json","Petal_FacePetal_rawdata2_Accuracy.json","Face_Rect_rawdata1_Accuracy.json","Rect_Face_rawdata2_Accuracy.json","Rect_rawdata1_Accuracy.json","Rect_rawdata2_Accuracy.json","Face_rawdata1_Accuracy.json","Face_rawdata2_Accuracy.json","TotemPole_rawdata1_Accuracy.json","TotemPole_rawdata2_Accuracy.json","Petal_rawdata1_Accuracy.json","Petal_rawdata2_Accuracy.json","Rectangle_Accuracy.json","Petals_Accuracy.json","TotemPole_Accuracy.json","FaceData_Accuracy.json"]
  selectedChart="BarChart"
  private mainFile="Face_RectFace_rawdata2_Accuracy.json"
  private addedFile:any
  private allAdditionalFiles=[]


  constructor(private _http:Http,public pcordinate:BarchartComponent, public globalFunction:GlobalFunctionsService, public selection:SelectionService) {

  this.tableView=true;
  this.barChart=true;
  this.accuracyViz=false;
  this.PC=false;

    this.globalFunction.getDataObservable("./assets/Face_RectFace_rawdata2_Accuracy.json").subscribe(
      data => {

        //pcordinate.drawParallelCoordinate(data);
        //Listing out all measures in the data file
        this.fields=Object.keys(data[0]);
        //
        // data.sort((t1,t2) => {
        //   if (t1.accuracy > t2.accuracy) {
        //     return 1;
        //   }
        //
        //   if (t1.accuracy < t2.accuracy) {
        //     return -1;
        //   }
        //
        //   return 0;
        // })

        this.chartData=data
        //this.chartData=data.filter(data => data.age >32)
      }
    );
  }



   //TODO : Find a better way to conver to change the type of visualization
  //One way vs two way binding https://stackoverflow.com/questions/33700266/how-can-i-get-new-selection-in-select-in-angular-2
    selectBoxInput(deviceValue)
    {
      if(deviceValue=="BarChart"){
        this.tableView=false
        this.accuracyViz=false
        this.barChart=true
        this.PC=false
        this.selectedChart="BarChart"
      }
      if(deviceValue=="TableView"){
        this.barChart=false;
        this.accuracyViz=false
        this.tableView=true
        this.PC=false;
        this.selectedChart="TableView"

      }
      if(deviceValue=="AccuracyView"){
        this.barChart=false;
        this.tableView=false
        this.accuracyViz=true
        this.PC=false
        this.selectedChart="AccuracyView"

      }
      if(deviceValue=="PC"){
        this.barChart=false;
        this.tableView=false
        this.accuracyViz=false
        this.PC=true
        this.selectedChart="PC"
      }
    }

    //Changing Filename through option box
    changeFile(value)
    {
      this.tableView=false;
      this.barChart=false;
      this.accuracyViz=false;
      this.PC=false

      this.globalFunction.getDataObservable("./assets/"+value).subscribe(
        data => {

          //Listing out all measures in the data file
          this.fields=Object.keys(data[0]);

          // data.sort((t1,t2) => {
          //   if (t1.accuracy > t2.accuracy) {
          //     return 1;
          //   }
          //
          //   if (t1.accuracy < t2.accuracy) {
          //     return -1;
          //   }
          //
          //   return 0;
          // })

          this.chartData=data
          this.selectBoxInput(this.selectedChart)

        }
      );

    }



    addFile(value){

      this.tableView=false;
      this.barChart=false;
      this.accuracyViz=false;
      this.PC=false



      this.globalFunction.getDataObservable("./assets/"+value).subscribe(
          data => {

            console.log(data)
            var tempArray=this.chartData.map((d) => {
              d['block']=1
              return d
            })

            data=data.map((d) => {
              d['block']=2
              return d
            })

            this.chartData= tempArray.concat(data)

            //Listing out all measures in the data file

            this.chartData.sort((t1,t2) => {
              if (t1.accuracy > t2.accuracy) {
                return 1;
              }

              if (t1.accuracy < t2.accuracy) {
                return -1;
              }

              return 0;
            })

            this.selectBoxInput(this.selectedChart)
          }
        );
    }

    pushFile():void{
      this.allAdditionalFiles.push(this.addedFile)
    }


    ngOnInit() {

    }
}
