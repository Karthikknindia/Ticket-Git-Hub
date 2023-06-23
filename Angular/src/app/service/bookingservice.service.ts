import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bookings } from '../models/bookings.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {


  baseUrl='https://192.168.1.186';
  constructor(private http: HttpClient) { }

  getallbooking(bookings: bookings): Observable<bookings[]>{
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Booking/GetAllBooking';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<bookings[]>(url,bookings,httpOptions);
  }

  addticket(bookings: bookings): Observable<any>{
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Booking/AddBooking';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    bookings.booking_id = 0;
    console.log(bookings);
    return this.http.post<bookings>(url, bookings,httpOptions);
  }
  
  getBookingsByName(username: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Booking';
    const url = `${this.baseUrl}${endpoint}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<any>(`${url}/getbyname?username=${username}`, null, httpOptions);
}
}
