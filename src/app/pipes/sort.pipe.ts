import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})

/**
 * SortPipe class used to sort
 * the list in ascending or descending order
 */
export class SortPipe implements PipeTransform {

  transform(values: any[], args: any[]): any {
    const sortField = args[0];
    const sortDirection = args[1];
    let multiplier = sortDirection ? 1 : -1;
    values.sort((a:any,b:any)=>{
      if(a[sortField] < b[sortField]) return -1 * multiplier;
      else if(a[sortField] > b[sortField]) return 1 * multiplier;
      else return 0;
    })
    return values;
  }

}
