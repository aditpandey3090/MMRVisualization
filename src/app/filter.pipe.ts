/**
 * Created by aditeyapandey on 12/19/18.
 */

import { Pipe, PipeTransform } from '@angular/core'
import {SelectionService} from './src/selectionService/selection.service'


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor(private selection:SelectionService){}

  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) { this.selection.selectValue(items);return items;}
    searchText = searchText.toLowerCase();

    let filteredData= items.filter( it => {
      return it['feedback'].toLowerCase().includes(searchText) || it['sex'].toLowerCase().includes(searchText)
    });

    this.selection.selectValue(filteredData)
    return filteredData
  }
}
