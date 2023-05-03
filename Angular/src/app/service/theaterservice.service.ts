import { HttpClient } from '@angular/common/http';
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
    return this.http.post<theaters[]>("https://localhost:44304/api/Theater/GetAlltheaters",theaters);
  }
  adduser(theaters: theaters): Observable<any>{
   
    theaters.theater_id = 0;
    console.log(theaters);
    return this.http.post<theaters>("https://localhost:44304/api/Theater/AddTheater", theaters);
  }

  deletetheater(theater_id: number) : Observable<theaters>{
 
    return this.http.delete<theaters>("https://localhost:44304/api/Theater/" + theater_id); 
  }
  getTheaterById(theater_id:number): Observable<theaters> {
   
   
    return this.http.post<theaters>("https://localhost:44304/api/Theater/" , theater_id);
  }
  
  updateTheater(theaters: theaters): Observable<any> {
    
   
    return this.http.post<theaters>("https://localhost:44304/api/Theater/UpdateTheater",theaters);
  }
}
