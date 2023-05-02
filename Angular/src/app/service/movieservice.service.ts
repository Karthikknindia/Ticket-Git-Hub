import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { theaters } from '../models/theaters.model';
import { movies } from '../models/movies.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieserviceService {
  baseUrl='https://localhost:44304/api/Movies/GetAllMovies/';
  
  constructor(private http: HttpClient) { }

  getallmovies(movies: movies): Observable<movies[]>{
    return this.http.post<movies[]>("https://localhost:44304/api/Movies/GetAllMovies/",movies);
  }

  addmovie(movies: movies): Observable<any>{
    
    movies.movie_id = 0;
    console.log(movies);
    return this.http.post<movies>("https://localhost:44304/api/Movies/AddMovies/", movies);
  }

  deletemovie(movie_id: number) : Observable<movies>{

    return this.http.delete<movies>("https://localhost:44304/api/Movies/" + movie_id); 
  }
  getMovieById(movie_id:number ,movies: movies): Observable<movies> {
   
   
    return this.http.post<movies>("https://localhost:44304/api/Movies/GetById" + movie_id,movies);
  }
  
  updatemovie(movies: movies): Observable<any> {
    
   
    return this.http.post<movies>("https://localhost:44304/api/Movies/Update",movies);
  }
}
