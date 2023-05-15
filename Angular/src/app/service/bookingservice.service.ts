import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bookings } from '../models/bookings.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingserviceService {


  baseUrl='https://localhost:44304/api/Booking';
  constructor(private http: HttpClient) { }

  getallbooking(bookings: bookings): Observable<bookings[]>{
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<bookings[]>("https://localhost:44304/api/Booking/GetAllBooking",bookings,httpOptions);
  }

  addticket(bookings: bookings): Observable<any>{
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    bookings.booking_id = 0;
    console.log(bookings);
    return this.http.post<bookings>("https://localhost:44304/api/Booking/AddBooking", bookings,httpOptions);
  }
  
  getBookingsByName(username: any): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<bookings>("https://localhost:44304/api/Booking/getbyname?username=" + username,username,httpOptions);
}
}
