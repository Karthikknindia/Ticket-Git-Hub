import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { theaters } from '../models/theaters.model';
import { movies } from '../models/movies.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieserviceService {
  token: any;
  baseUrl='https://localhost:44304/api/Movies/GetAllMovies/';
 
  constructor(private http: HttpClient) { }
 
  getallmovies(movies: movies): Observable<movies[]>{
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<movies[]>("https://localhost:44304/api/Movies/GetAllMovies/",movies,httpOptions);
  }

  addmovie(movies: movies): Observable<any>{
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    
    movies.movie_id = 0;
    console.log(movies);
    return this.http.post<movies>("https://localhost:44304/api/Movies/AddMovies/", movies,httpOptions);
  }

  deletemovie(movie_id: number) : Observable<movies>{
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.delete<movies>("https://localhost:44304/api/Movies/" + movie_id,httpOptions); 
  }
  getMovieById(movie_id:number ,movies: movies): Observable<movies> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
   
    return this.http.post<movies>("https://localhost:44304/api/Movies/GetById" + movie_id,movies,httpOptions);
  }
  
  updatemovie(movies: movies): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
   
    return this.http.post<movies>("https://localhost:44304/api/Movies/Update",movies,httpOptions);
  }
}
