import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { theaters, theatersrespons } from '../models/theaters.model';

@Injectable({
  providedIn: 'root'
})
export class TheaterserviceService {
  
 

  baseUrl='https://localhost:44304/api/Theater';
  constructor(private http: HttpClient) { }

  getalltheaters(theaters:theaters): Observable<theaters[]>{
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<theaters[]>("https://localhost:44304/api/Theater/GetAlltheaters",theaters,httpOptions);
  }
  adduser(theaters: theaters): Observable<any>{
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    theaters.theater_id = 0;
    console.log(theaters);
    return this.http.post<theaters>("https://localhost:44304/api/Theater/AddTheater", theaters,httpOptions);
  }

  deletetheater(theater_id: number) : Observable<theaters>{
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.delete<theaters>("https://localhost:44304/api/Theater/" + theater_id,httpOptions); 
  }
  getTheaterById(theater_id:number): Observable<theaters> {
   
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<theaters>("https://localhost:44304/api/Theater/" , theater_id,httpOptions);
  }
  
  updateTheater(theaters: theaters): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
   
    return this.http.post<theaters>("https://localhost:44304/api/Theater/UpdateTheater",theaters,httpOptions);
  }
}
