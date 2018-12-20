import { Component, OnInit,ElementRef,ViewChild,Input,ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import * as ttest from 'ttest'


@Component({
  selector: 'app-parallelcoord',
  templateUrl: 'parallelcoord.component.html',
  styleUrls: ['parallelcoord.component.css'],
  encapsulation: ViewEncapsulation.None
})




export class ParallelcoordComponent implements OnInit {
  @ViewChild('visContainer') private visContainer: ElementRef;
  @Input() private data: Array<any>;
  private margin: any = { top: 20, bottom: 20, left: 30, right: 20};
  private width: number;
  private height: number;
  activeCheckBox=false
  activeMedian=false
  private individualData:any
  private averageData:any
  private activeData:any
  private svg:any
  private x:any
  private y:any
  private line:any
  private axis:any
  private background:any
  private foreground
  private dimensions
  private fp:any
  private medianData:any
  private percentileData:any
  private percentileInput=50
  private percentileTopN=false
  private percentileBottomN=false
  private percentileInput2=50
  private activeAverage:boolean
  private allStimuli:string[]
  private PVal:number
  private tTestInput: any = {dimension1:"",dimension2:"",ttestData:{}}
  private tTest ():number
    {
      //There coulbe be two cases
      //1. When the entire data is input
      //2. When a subset of the data is sent as input through the percentile data, in that case we need to call average
      //We should at all times extract from the selectedData array
      console.log(this.tTestInput.dimension1)
      console.log(this.tTestInput.dimension2)
      let localData=this.activeData

      let categories=["accuracy",'true-false-false','false-true-false','false-false-true','true-true-false','false-true-true','true-false-true','true-true-true']

      let ttestData={}
      categories.forEach(function(d){
        localData.filter(function(array){
          if(ttestData[d]){
            ttestData[d].push(array[d])
          }
          else{
            ttestData[d]=[]
            ttestData[d].push(array[d])
          }
        })
      })

      let array1=ttestData[this.tTestInput.dimension1]
      let array2=ttestData[this.tTestInput.dimension2]
      this.PVal=ttest(array1, array2).pValue()

      console.log(this.PVal)
      return

    }




  constructor() {

  }

  ngOnInit() {
    this.individualData=this.dataCreationForPC(this.data)
    this.activeData=this.individualData
    let tempAvgFunctionData=this.average(this.individualData)
    this.averageData=tempAvgFunctionData[0]
    this.medianData=tempAvgFunctionData[1]
    this.createCanvas(this.individualData)
    this.createChart(this.individualData)
    //this.drawConfidenceIntervals([])
    this.calculateConfidenInterval()


  }

  createCanvas(testData) : any{
    let element = this.visContainer.nativeElement;
    this.width = (2*window.screen.width)/3
    this.height = (2*window.screen.height)/3

    // this.x = d3.scalePoint().range([0, this.width]).padding(1)
    // let y = {};
    //
    // this.line = d3.line()
    // this.axis = d3.axisLeft()
    // this.background
    // this.foreground;

    this.svg = d3.select(element).select("svg")
      .attr('width', this.width-this.margin.right)
      .attr('height',this.height+this.margin.bottom+this.margin.top).append("g").attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

  // this.dimensions=d3.keys(testData[0])
  //   this.x.domain(() => d3.keys(testData[0]).filter((d) => {
  //     return d != "name" && (this.y[d] = d3.scaleLinear().domain([0,1]).range([this.height, 0]));}));

    console.log(this.x)

    // this.background=this.svg.append("g")
    //   .attr("class", "background")

    // this.foreground=this.svg.append("g")
    //   .attr("class", "foreground")

  }



  createChart(data) : any {

    let width=this.width
    let height=this.height

    var svg=this.svg


    let x = d3.scalePoint().range([0, width]).padding(1)
    let y = {};


    var line = d3.line(),
      axis = d3.axisLeft(),
      background,
      foreground;

    var dimensions
    x.domain(dimensions = d3.keys(data[0]).filter(function(d) {
      return (d != "name" ) && (d != "accuracy" )   && (y[d] = d3.scaleLinear()
          .domain([0,100])
          .range([height, 0])

        );
    }));
    var formatPercent = d3.format("00.0000000%");


    var foreground=this.foreground



    //Code Inspired from  https://bl.ocks.org/jerdak/5d37e36603bd4397ac51fe5032bcfe3e



    // Add grey background lines for context.
   // this.background.seletAll("[ath")
   //    .data(data)
   //    .enter().append("path")
   //    .attr("d", path);



    // Add blue foreground lines for focus.

      d3.selectAll(".foreground").remove()


    foreground = svg.append("g")
      .attr("class", "foreground")
      .selectAll("path")
      .data(data)
      .enter().append("path")
      .attr("d", path);




    // Returns the path for a given data point.
    function path(d) {
      return line(dimensions.map(function(p) { return [x(p), y[p](d[p])]; }));
    }

    // Add a group element for each dimension.
    var g = this.svg.selectAll(".dimension")
      .data(dimensions)
      .enter().append("g")
      .attr("class", "dimension")
      .attr("transform", function(d) { return "translate(" + x(d) + ")"; });

    g.append("g")
      .attr("class","confidence axis")
      .each(function(d) { d3.select(this).call(axis.scale(y[d]).tickFormat((d,i) => {
        if(i==12){return d + "%"}
        else return d
        })) })
      .append("rect")
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
      .text(function(d) { return d+"%"; });
      // .attr("x", -4)
      // .attr("width", 8)
      // .attr("fill","indianred")
      // .attr("transform", function(d) { return "translate(0," + y[d](0.7) + ")"; })
      // .attr("height", function(d){return y[d](0.7)})
      // .attr("opacity","0.2");

    // Add an axis and title.
    g.append("g")
      .attr("class", "axis")
      .each(function(d) { d3.select(this).call(axis.scale(y[d])); })
      .append("text")
      .style("text-anchor", "middle")
      .attr("y", -9)
       .text(function(d) { return d; });

    this.y=y

    // Add and store a brush for each axis.
    g.append("g")
      .attr("class", "brush")
      .each(function(d) {
        d3.select(this).call(y[d].brush = d3.brushY()
          .extent([[-10,0], [10,height]])
          .on("brush", brush)
          .on("end", brush)
        )
      })
      .selectAll("rect")
      .attr("x", -8)
      .attr("width", 16);

    //Adding a rectangle to show 95 CI




    function brush() {
      var actives = [];
      svg.selectAll(".brush")
        .filter(function(d) {
          y[d].brushSelectionValue = d3.brushSelection(this);
          return d3.brushSelection(this);
        })
        .each(function(d) {
          // Get extents of brush along each active selection axis (the Y axes)
          actives.push({
            dimension: d,
            extent: d3.brushSelection(this).map(y[d].invert)
          });
        });

      console.log(actives)

      // Update foreground to only display selected values
      foreground.style("display", function(d) {
        return actives.every(function(active) {
          return active.extent[1] <= d[active.dimension] && d[active.dimension] <= active.extent[0];
        }) ? null : "none";
      });
    }


  }

  dataCreationForPC(data) : any
  {
    console.log(data)
    let categories=['true-false-false','false-true-false','false-false-true','true-true-false','false-true-true','true-false-true','true-true-true']
    ///let optimalResponses={'true-false-false':1,'false-true-false':1,'false-false-true':1,'true-true-false':2,'false-true-true':2,'true-false-true':2,'true-true-true':2}

    const  optimalResponses1={'true-false-false':1,'false-true-false':1,'false-false-true':1,'true-true-false':2,'false-true-true':2,'true-false-true':2,'true-true-true':2}
    const optimalResponses2={'true-false-false':2,'false-true-false':2,'false-false-true':2,'true-true-false':1,'false-true-true':1,'true-false-true':1,'true-true-true':1}
      let finalData=[]
    let totalStimuliCount={}
    let optimalResponseCount={}
    let optimalResponseCountPercent=[]
    this.allStimuli=categories

    data.forEach(element=>{

      console.log(element.block)
      var optimalResponses
      if(element.block==1){
        optimalResponses=optimalResponses2
      }
      else{
        optimalResponses=optimalResponses1
      }

      let responses=JSON.parse(element.response);
      let storeStimuli=JSON.parse(element.stimuli);

      totalStimuliCount[element.workerid]={}
      optimalResponseCount[element.workerid]={}

      storeStimuli.forEach(stimuli => {
        totalStimuliCount[element.workerid][stimuli]=  totalStimuliCount[element.workerid][stimuli] ?   totalStimuliCount[element.workerid][stimuli]+1 : 1;
      })

      let optArray=storeStimuli.map(x => optimalResponses[x])
      responses.forEach((x,i) => {

        let stimuli=storeStimuli[i]
        if(!optimalResponseCount[element.workerid][stimuli]){
          optimalResponseCount[element.workerid][stimuli] = 0
        }
        if(x==optArray[i])
        {
          optimalResponseCount[element.workerid][stimuli]= optimalResponseCount[element.workerid][stimuli]+1
        }
       })

      let individualOptimalResponseCountPercent={}

      categories.forEach((stimuli,i) =>{
        individualOptimalResponseCountPercent['name']=element.workerid
        individualOptimalResponseCountPercent['accuracy']=element.accuracy*100
       individualOptimalResponseCountPercent[stimuli]= (optimalResponseCount[element.workerid][stimuli]/totalStimuliCount[element.workerid][stimuli])*100
      })

      optimalResponseCountPercent.push(individualOptimalResponseCountPercent)
    })
    return optimalResponseCountPercent
  }

  //This function gives updated filtered array and then gives the average function finds the average and median value
  average(data): any{

    var newData={}
    var medianData={}
    let categories=["accuracy",'true-false-false','false-true-false','false-false-true','true-true-false','false-true-true','true-false-true','true-true-true']
    const reducer = (accumulator,currentValue) => accumulator+currentValue

    categories.forEach(function(d){
      data.filter(function(array){
      if(newData[d]){
        newData[d].push(array[d])
      }
      else{
        newData[d]=[]
        newData[d].push(array[d])
      }
      })
    })

    //Finding the median
    Object.keys(newData).forEach(function(d) {
      var medianVal = newData[d].sort()
      medianData[d] = medianVal[Math.floor(medianVal.length/2)]
    })
    medianData['name']="Median"
    //this.medianData=[medianData]

    //Finding the average
    Object.keys(newData).forEach(function(d){
      var length=newData[d].length
      newData[d]= newData[d].reduce(reducer)/length
    })

    //Printing the average when queried
    console.log("Avgs",newData)

    newData['name']="Average"
    return [[newData],[medianData]]
  }



  onChange(newValue) {
    if(newValue){
      this.createChart(this.averageData)
      this.activeData=this.averageData
    }
    else{
      this.createChart(this.individualData)
      this.activeData=this.individualData

    }
  }

  onChangeMedian(newValue){
    if(newValue){
      this.createChart(this.medianData)
      this.activeData=this.medianData
    }
    else{
      this.createChart(this.individualData)
      this.activeData=this.individualData
    }
  }

  //The percentile calculation function is responsible for extracting the percentile data
  percentileCalculation(data,percentile,direction):any{

    //Assumption: The input array is sorted
    let percentileData={}
    let percentileIndex= Math.round(data.length*(percentile/100))
    let categories=["accuracy",'true-false-false','false-true-false','false-false-true','true-true-false','false-true-true','true-false-true','true-true-true']

    if(direction=="top"){
      this.percentileData=this.data.slice(percentileIndex,this.data.length)
    }
    else{
      this.percentileData=this.data.slice(0,percentileIndex)
    }

    this.percentileData=this.dataCreationForPC(this.percentileData)
    this.activeData=this.percentileData

    this.calculateConfidenInterval()


    if(this.activeAverage && (this.percentileTopN||this.percentileBottomN)){
      let tempAvg=this.average(this.percentileData)
      this.percentileData=tempAvg[0]
    }

    this.createChart(this.percentileData)
    this.activeData=this.percentileData

    //If show confidenceInterval is on then we have to call this function

  }

  //These functions are for the sliders
  onChangePercentileInput(value){
    this.percentileCalculation(this.individualData,this.percentileInput,"top")
  }
  onChangePercentileInput2(value){
    this.percentileCalculation(this.individualData,this.percentileInput2,"bottom")
  }

  //This function is for the actual checkbox of the percentile
  onChangePercentileCheckBox(value){
  if(!value)
  {
    this.createChart(this.individualData)
    this.activeData=this.individualData
  }
  }


  calculateConfidenInterval():void{
    console.log(this.activeData)

    let categories=["accuracy",'true-false-false','false-true-false','false-false-true','true-true-false','false-true-true','true-false-true','true-true-true']

    let data=this.activeData;

    let newData={}
    categories.forEach(function(d){
      data.filter(function(array){
        if(newData[d]){
          newData[d].push(array[d])
        }
        else{
          newData[d]=[]
          newData[d].push(array[d])
        }
      })
    })

    let condidenceData={}

    for (let key in newData){
     var result=this.confidence99(newData[key])
     condidenceData[key]=[result.mean-result.interval,result.mean+result.interval]
    }
    console.log(condidenceData)
    this.drawConfidenceIntervals([],condidenceData)

  }

  drawConfidenceIntervals(array,ciObj):void{
    // let ci={'accuracy':[0,0],'true-false-false':[0.73,0.891],'false-true-false':[0.73,0.891],'false-false-true':[0.73,0.891],'true-true-false':[0.20,0.47],'false-true-true':[0.20,0.47],'true-false-true':[0.20,0.47],'true-true-true':[0.047,0.1]}
     let ci=ciObj
    let allgroups=d3.selectAll(".confidence")

    allgroups.selectAll("rect")
    .attr("x", -4)
    .attr("width", 8)
    .attr("fill","indianred")
      .style("stroke","gray")
      .style("stroke-width","2")
    .attr("transform", (d) => { console.log(d); return  "translate(0," + this.y['true-true-false'](ci[d][1]) + ")"})
    .attr("height", (d) =>{return  this.y[d](100- (Math.abs(ci[d][1]-ci[d][0])))})
    .attr("opacity","0.8");
    }


    //Calculate COnfidence Interval

    listSum(lst) {
     return lst.reduce(function(a, b){ return a+b; });
    };

     confidence99 = function(numbers) {
      var sum = this.listSum(numbers);
      var mean = sum/numbers.length;
      var sqerrs = numbers.map(function(n){ return (n - mean)*(n - mean); });
      var std = Math.sqrt(this.listSum(sqerrs)/numbers.length);
      var interval = 	2.56 *std/Math.sqrt(numbers.length);
      return {
        mean: mean,
        std: std,
        interval: interval
      };
    };


}
