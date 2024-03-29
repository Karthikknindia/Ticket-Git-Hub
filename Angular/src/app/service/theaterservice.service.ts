import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { theaters, theatersrespons } from '../models/theaters.model';

@Injectable({
  providedIn: 'root'
})
export class TheaterserviceService {
  
 

  baseUrl='https://192.168.1.186';
  constructor(private http: HttpClient) { }

  getalltheaters(theaters:theaters): Observable<theaters[]>{
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Theater/GetAlltheaters';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<theaters[]>(url,theaters,httpOptions);
  }
  adduser(theaters: theaters): Observable<any>{
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Theater/AddTheater';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    theaters.theater_id = 0;
    console.log(theaters);
    return this.http.post<theaters>(url, theaters,httpOptions);
  }

  deletetheater(theater_id: number) : Observable<theaters>{
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Theater/Delete';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<theaters>(url , theater_id,httpOptions); 
  }
  getTheaterById(theater_id:number): Observable<theaters> {
   
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Theater/';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<theaters>(url , theater_id,httpOptions);
  }
  
  updateTheater(theaters: theaters): Observable<any> {
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Theater/UpdateTheater';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
   
    return this.http.post<theaters>(url,theaters,httpOptions);
  }
}
