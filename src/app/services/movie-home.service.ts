import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MOVIES_LIST_API, MOVIE_GENRES_LIST_API } from '../constants/api-constants';

@Injectable({
  providedIn: 'root'
})
export class MovieHomeService {

  constructor(private http:HttpClient) { }

  /**
   * getMoviesData() used to fetch 
   * movies list
   * @returns movies data
   */
  getMoviesData(){
    return this.http.get(MOVIES_LIST_API);
  }

  /**
   * getMoviesGenre() used to fetch 
   * movies generes list
   * @returns movies genres 
   */
  getMoviesGenre(){
    return this.http.get(MOVIE_GENRES_LIST_API);
  }

}
