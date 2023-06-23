import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TicketComponent } from '../ticket/ticket.component';
import { bookings } from 'src/app/models/bookings.model';
import { movies } from 'src/app/models/movies.model';
import { BookingserviceService } from 'src/app/service/bookingservice.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent {


  myimage2:string="assets/images/wallpaperflare.com_wallpaper.jpg"
diaposter:string="assets/images/Dia-movie-is-now-streaming-on-Amazon-Prime-Video.jpg"

jailerposter:string="assets/images/jailer poster.jpg"
leoposter:string="assets/images/vijay-leo-movie-stills-hd-wallpapers-1200px-4288182.jpg"

bookings: bookings[] = [];
  booking: bookings = {
    booking_id: 0,
    booking_name: '',
    booking_email: '',
    booking_seats: '',
    booking_movie: '',
    booking_date: '',
    booking_theater: '',
    booking_showtime: '',
    booking_createdate: new Date(),
    booking_updatedate: new Date(),
    booking_poster: '',
    booking_amount: ''
  }

  movies: movies[] = [];
  movie: movies = {
    movie_id: 0,
    movie_name: '',
    movie_categories: '',
    movie_theater: '',
    movie_poster: '',
    movie_showtiming: '',
    movie_status: '',
    movie_createdate: new Date,
    movie_updatedate: new Date,
    movie_director: '',
    movie_timeduration: '',
    movie_cast: '',
    movie_thumbnail: '',
    movie_ytlink: '',
    movie_screen: ''
  }
  selectedMovie: any;
row: any;
  name!: string;
  username: any;
  bookingtik!:boolean;

constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _dialog:MatDialog,public bookingservice: BookingserviceService){

}

ticket(row:any) {
  debugger
  const dialogRef = this._dialog.open(TicketComponent, {
    data: { row , bookingtik:this.bookingtik = true}
  });
}

ngOnInit(){
  debugger
 
  const username = sessionStorage.getItem('username');
    this.getBookingsByName(username);



}



getBookingsByName(username: any) {
  debugger
 
  this.bookingservice.getBookingsByName(username).subscribe(response => {
    this.bookings= response;
    console.log(response);
  });
}




}
