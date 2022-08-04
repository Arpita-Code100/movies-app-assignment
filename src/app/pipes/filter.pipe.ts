import { Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { MovieHomeService } from '../services/movie-home.service';

@Pipe({
  name: 'filter'
})

/**
 * FilterPipe class used to filter/search
 * results based on input entered (movie names/ movie genres)
 */
export class FilterPipe implements PipeTransform {
  genresList:[]=[];
  constructor(private service:MovieHomeService, private route:Router){
    this.fetchMovieGenres();
  }

  transform(values: [], filteredValue:string,propertyName:any[]):any[]{
    let filteredArray:any[] = [];
    
    if(values.length === 0 || !filteredValue || propertyName.length === 0){
      return values;
    }
    values.forEach(val => {
      let value=filteredValue[0].toUpperCase()+filteredValue.slice(1).toLowerCase();
      if(val[propertyName[0]] && String(val[propertyName[0]]).includes(value))
        filteredArray.push(val);
      if(propertyName[1]==='genre_ids'){
        let value = this.getMoviesGenre(val,filteredValue);
        if(value!=='') filteredArray.push(value);
      }
    });  
    return filteredArray;
  }

  /**
   * fetchMovieGenres() used to fetch
   * the movie genre list
   */
  fetchMovieGenres(){
    this.service.getMoviesGenre().subscribe(data=>{
      let result:any=data;
      this.genresList=result.genres;
    },err=>{
      this.route.navigate(['/error'])
    });
  }

  /**
   * getMoviesGenre() used to get the Genre names 
   * based on Genre ids fetched
   * @param val 
   * @param filteredValue 
   * @returns 
   */
  getMoviesGenre(val:any,filteredValue:any){
      let movieGenres = this.genresList.filter(el=>val['genre_ids'].includes(el['id'])).map(el=>el['name']);
      val['genreName']=movieGenres;
      let value=filteredValue[0].toUpperCase()+filteredValue.slice(1).toLowerCase();
      if(val['genreName'].length>0 && val['genreName'].includes(value))
        return val;
      else
        return "";
  }

}
