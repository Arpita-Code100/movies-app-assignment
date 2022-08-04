import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-home',
  templateUrl: './movies-home.component.html',
  styleUrls: ['./movies-home.component.css']
})
export class MoviesHomeComponent implements OnInit {
  num=[1,2];
  constructor() { }

  ngOnInit(): void {
    this.getMoviesData();
  }

  getMoviesData(){
    
  }

}
