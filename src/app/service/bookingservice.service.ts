import { HttpClient } from '@angular/common/http';
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
    return this.http.get<bookings[]>("https://localhost:44304/api/Booking");
  }

  addticket(bookings: bookings): Observable<any>{
  
    bookings.booking_id = 0;
    console.log(bookings);
    return this.http.post<bookings>("https://localhost:44304/api/Booking", bookings);
  }
  getBookingsByName(username: any): Observable<any> {
    return this.http.get<bookings>("https://localhost:44304/api/Booking/getbyname?username=" + username);
}
}
