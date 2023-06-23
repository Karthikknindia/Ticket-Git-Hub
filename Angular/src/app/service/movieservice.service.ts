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
  baseUrl='https://192.168.1.186';
 
  constructor(private http: HttpClient) { }
 
  getallmovies(movies: movies): Observable<movies[]>{
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Movies/GetAllMovies';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<movies[]>(url,movies,httpOptions);
  }

  addmovie(movies: movies): Observable<any>{
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Movies/AddMovies';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    
    movies.movie_id = 0;
    console.log(movies);
    return this.http.post<movies>(url, movies,httpOptions);
  }

  deletemovie(movie_id: number) : Observable<movies>{
    debugger
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Movies/Delete';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<movies>(url , movie_id,httpOptions); 
  }
  getMovieById(movie_id:number ,movies: movies): Observable<movies> {
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Movies/GetById';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
   
    return this.http.post<movies>(url+ movie_id,movies,httpOptions);
  }
  
  updatemovie(movies: movies): Observable<any> {
    debugger
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Movies/Update';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
   
    return this.http.post<movies>(url,movies,httpOptions);
  }
}
