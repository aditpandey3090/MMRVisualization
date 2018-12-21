import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';  // we need to import this now
import {Http} from '@angular/http';

//Todo: Input json file needs a data processor: the data processor needs to address the needs of precprocessing data file information
//Todo: Remove redundant data rows
//Todo: Convert female to f and male to m

@Injectable()
export class GlobalFunctionsService {

  public fileNames=["TotemPoleCond2.json","PetalCond2.json","FaceCond2.json","RectangleCond2.json","PetalCond1.json","TotemPoleCond1.json","RectangleCond1.json","FaceCond1.json","Face_RectFace_rawdata2_Accuracy.json","Rect_RectFace_rawdata1_Accuracy.json","Rect_TotemRect_rawdata2_Accuracy.json","Totem_TotemRect_rawdata1_Accuracy.json","Totem_RectTotem_rawdata2_Accuracy.json","Rect_RectTotem_rawdata1_Accuracy.json","Petal_TotemPetal_rawdata2_Accuracy.json","Totem_TotemPetal_rawdata1_Accuracy.json","Totem_PetalTotem_rawdata2_Accuracy.json","Petal_PetalTotem_rawdata1_Accuracy.json","Face_TotemFace_rawdata2_Accuracy.json","Totem_TotemFace_rawdata1_Accuracy.json","Totem_FaceTotem_rawdata2_Accuracy.json","Face_FaceTotem_rawdata1_Accuracy.json","Petal_RectPetal_rawdata2_Accuracy.json","Rect_RectPetal_rawdata1_Accuracy.json","Petal_PetalRect_rawdata1_Accuracy.json","Rect_PetalRect_rawdata2_Accuracy.json","Petal_PetalFace_rawdata1_Accuracy.json","Face_PetalFace_rawdata2_Accuracy.json","Face_FacePetal_rawdata1_Accuracy.json","Petal_FacePetal_rawdata2_Accuracy.json","Face_Rect_rawdata1_Accuracy.json","Rect_Face_rawdata2_Accuracy.json","Rect_rawdata1_Accuracy.json","Rect_rawdata2_Accuracy.json","Face_rawdata1_Accuracy.json","Face_rawdata2_Accuracy.json","TotemPole_rawdata1_Accuracy.json","TotemPole_rawdata2_Accuracy.json","Petal_rawdata1_Accuracy.json","Petal_rawdata2_Accuracy.json","Rectangle_Accuracy.json","Petals_Accuracy.json","TotemPole_Accuracy.json","FaceData_Accuracy.json"]
  private chartData: any;


  constructor(private _http:Http) { }

  //Param: Name of the file to read
  //Returns: Data file in a json format
  public getDataObservable(url:string)
  {
   return this._http.get(url)
    .map(data => {
      data.json();
      // the console.log(...) line prevents your code from working
      // either remove it or add the line below (return ...)

      return data.json();

    });
  }
}




