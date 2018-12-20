import { Component, OnInit,ElementRef,ViewChild,Input,ViewEncapsulation } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import * as ttest from 'ttest'
import { GlobalFunctionsService } from '../../global-functions.service';


@Component({
  selector: 'app-distributioncomparison',
  templateUrl: 'distributioncomparison.component.html',
  styleUrls: ['distributioncomparison.component.css'],
  providers:[GlobalFunctionsService]
})
export class DistributioncomparisonComponent implements OnInit {
  @ViewChild('visContainer') private visContainer: ElementRef;
  @Input() private data: Array<any>;
  private file1:string
  private file2:string
  private ttestOutput:number
  private fields:Array<any>
  private data1:any
  private data2:any
  private finalArray1:number[]
  private finalArray2:number[]
  private filenames:string[]


  constructor(public dashboard:DashboardComponent, public globalFunction:GlobalFunctionsService) {
    this.filenames=this.dashboard.fileNames;

  }

  ngOnInit() {

  }

  public loadData():void{
    let file1
    let file2=this.globalFunction.getDataObservable(this.file2)

    this.globalFunction.getDataObservable("./assets/"+this.file1).subscribe( data => {

      //Listing out all measures in the data file
      this.fields=Object.keys(data[0]);
      data=this.sortData(data)
      this.data1=data
      this.finalArray1=this.getArraytoCompare(data,"accuracy")

    })

    this.globalFunction.getDataObservable("./assets/"+this.file2).subscribe( data => {

      //Listing out all measures in the data file
      this.fields=Object.keys(data[0]);
      data=this.sortData(data)
      this.data2=data
      this.finalArray2=this.getArraytoCompare(data,"accuracy")
      this.ttestOutput=ttest(this.finalArray1, this.finalArray2).pValue()

    })

  }

  public sortData(data):any{

    data.sort((t1,t2) => {
      if (t1.accuracy > t2.accuracy) {
        return 1;
      }

      if (t1.accuracy < t2.accuracy) {
        return -1;
      }

      return 0;
    })

    return data

  }

  public getArraytoCompare(file,param):number[]{

    let finalArray=[]
    file.forEach((d) =>{
      finalArray.push(d[param])
    })

    return finalArray
  }


}
