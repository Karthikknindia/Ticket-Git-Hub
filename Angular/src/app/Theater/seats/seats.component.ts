import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentComponent } from 'src/app/Bookings/payment/payment.component';
import { bookings } from 'src/app/models/bookings.model';
import { movies } from 'src/app/models/movies.model';
import { theaters } from 'src/app/models/theaters.model';
import { BookingserviceService } from 'src/app/service/bookingservice.service';
import { MovieserviceService } from 'src/app/service/movieservice.service';
import { TheaterserviceService } from 'src/app/service/theaterservice.service';
import { TheatresComponent } from '../theatres/theatres.component';






@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.css']
})


export class SeatsComponent {
  screen:string="assets/images/screen-icon.8dd7f126-removebg-preview.png"


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
    movie_ytlink: ''
  }
  theaters: theaters[] = [];
  theater: theaters = {
    theater_id: 0,
    theater_name: '',
    theater_capacity: 0,
    theater_location: '',
    theater_screen: null,
    theater_status: '',
    theater_datetime: new Date(),
    theater_createdate: new Date(),
    theater_updatedate: new Date(),
    
  }

  
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

  selectedTiming: string = '';
  totalSeatsSelected: any;
  totalSeats: any;
  selectedSeats: string[] = [];
  selecteds:any;
  selectedDate: any;
  username:any;
  userEmail:any;
  name:any;
  shouldSubmit!: boolean;
  seats!: string;
  totalTicketPrice = 0;
  amountPerTicket = 120;
  numSeatsSelected=0;
  bookedSeats: any;
  theatercapacity: any;
 

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _dialog:MatDialog,public theaterservice:TheaterserviceService,public movieservice:MovieserviceService,private _snackBar: MatSnackBar,public bookingservice: BookingserviceService,public dialogRef: MatDialogRef<SeatsComponent>){

  }
  

  

  ngOnInit(): void {
    debugger
    this.getallmovies()
    this.getallbooking()
    this.getalltheaters()
    this.username=sessionStorage.getItem('username');
    this.userEmail=sessionStorage.getItem('userEmail');

    
    this.name = sessionStorage.getItem('userId');
    const date = new Date(this.data.selectedDate);
    this.selectedDate = date.toDateString();
   this.seats=this.booking.booking_seats
   this.numSeatsSelected=this.numSeatsSelected
    console.log(this.selectedSeats)
    this.movie = this.data.row
    this.selectedTiming=this.data.selectedTiming
    this.selectedSeats=this.selectedSeats
    this.theatercapacity=this.data.theatercapacity
   this.totalTicketPrice=this.totalTicketPrice
  //  this.selectedDate=this.data.selectedDate
    
  }
 

  ticket(row:any) {
    if (this.selectedSeats.length > 0) {
      this.dialogRef.close(SeatsComponent)
      const dialogRef = this._dialog.open(PaymentComponent, {
        disableClose: true,
        data: { row, selectedTiming: this.selectedTiming,selectedSeats:this.selectedSeats,selectedDate:this.selectedDate,numSeatsSelected:this.numSeatsSelected,totalTicketPrice:this.totalTicketPrice,shouldSubmit:this.shouldSubmit = true,} 
        
      });
    } else {
      this._snackBar.open('Please select at least one seat!', 'Close', { duration: 3000 });
    }
  }
  theat(row:any){
    debugger
   this._dialog.open(TheatresComponent,{
    disableClose: true,
    data:{row,selectedTiming: this.selectedTiming,selectedDate:this.selectedDate}
   })
  }

  getalltheaters() {
   
    
    this.theaterservice.getalltheaters(this.theater)

      .subscribe(
        response => {
          this.theaters = response;
          

        }
      )
  }

  getallmovies(){
    
    
    this.movieservice.getallmovies(this.movie)
    
    .subscribe(
      response=>{
        this.movies=response;
        
      }
    )
  }

 

  onSeatClick(event: { target: any; }) {
  
    const seat = event.target;
    if (seat.classList.contains('row')) {
      return;
    }
    if (seat.classList.contains('sold')) {
      return;
    }
    if (seat.classList.contains('container')) {
      return;
    }
    if (seat.classList.contains('selected')) {
      seat.classList.remove('selected');
      this.totalSeats--;
      this.numSeatsSelected--;
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat.id); 
      
    } else {
      if (this.numSeatsSelected < 5) { // check if the number of selected seats is less than 5
        seat.classList.add('selected');
        this.totalSeats++;
        this.numSeatsSelected++;
        this.selectedSeats.push(seat.id);
       
      }else{
        this._snackBar.open('Five Seats Only Allowed Per Person!', 'Close', { duration: 3000 });
      }
    }
 
    this.totalTicketPrice = this.amountPerTicket * this.numSeatsSelected;
    const selectedSeatsString = this.selectedSeats.join(',');
  
    return selectedSeatsString;
}

 
  

  getallbooking() {
    debugger;
    this.bookingservice.getallbooking(this.booking).subscribe(
      response => {
        this.bookings = response;
        this.bookedSeats = [];
  
        // Filter the response array based on the movie name
        const filteredBookings = response.filter(booking => booking.booking_movie === booking.booking_movie);
  
        // Collect all booked seats from the filtered bookings
        filteredBookings.forEach(booking => {
          const seats = JSON.parse(booking.booking_seats);
          this.bookedSeats.push(...seats);
        });
      }
    );
  }
  isSeatBooked(seatId: string, movieName: string, bookingDate: string,bookingTime:string): boolean {
    const matchingBookings = this.bookings.filter(booking => booking.booking_movie === movieName && booking.booking_date === bookingDate && booking.booking_showtime===bookingTime);
    const bookedSeats = matchingBookings.flatMap(booking => JSON.parse(booking.booking_seats));
    return bookedSeats.includes(seatId);
  }
  
  
  
}
