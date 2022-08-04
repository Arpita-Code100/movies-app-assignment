import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { reduce } from 'rxjs';
import { IMAGE_PATH } from 'src/app/constants/api-constants';
import { MovieHomeService } from 'src/app/services/movie-home.service';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.css']
})

/**
 * MoviesHomeComponent class is used to
 * implement the movies home page
 */
export class MoviesHomeComponent implements OnInit {
  searchForm:any;
  moviesList:[]=[];
  genresList:[]=[];
  imagePath:string='';
  sortByField:string='';
  isSortAscending:boolean=false;
  searchValue:string='';
  errorMessage:string='';

  constructor(private service:MovieHomeService, private route:Router) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'searchedItem' : new FormControl("")
    })
      this.getMoviesData();
  }

  /**
   * getImagePath() gets the dyanamic 
   * image path from the api
   * @param movie 
   * @returns string image path
   */
  getImagePath(movie:any){
    return this.imagePath=`${IMAGE_PATH}${movie.backdrop_path}`;
  }

  /**
   * getMoviesData() fetches
   * the movies list data
   */
  getMoviesData(){
    this.service.getMoviesData().subscribe(data=>{
      let result:any=data;
      this.moviesList=result.results;
    },err=>{
      this.route.navigate(['/error']);
    })
  }

  /**
   * sets the color for the rating
   * text based on rating of the movie
   * @param movie 
   * @returns string color name
   */
  getRateStyle(movie:any){
    if(movie['vote_average']<=3) return 'red';
    else if(movie['vote_average']>=6) return 'green';
    else return 'orange';
  }

  /**
   * onSearch() sets search value entered by 
   * the user
   */
  onSearch(){
    this.searchValue = this.searchForm.value.searchedItem;
    this.searchForm.reset();
  }
  
  /**
   * sortBy() sets the sort field clicked
   * and the order of the sort field
   * either ascending or descending
   * @param sortField 
   */
  sortBy(sortField:string){
    this.sortByField = sortField;
    this.isSortAscending = !this.isSortAscending;
  }

}
