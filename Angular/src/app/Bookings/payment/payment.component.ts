declare global {
  interface Window {
    Paytm: any;
  }
}

import { Component, Inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { TicketComponent } from '../ticket/ticket.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { movies } from 'src/app/models/movies.model';
import { MovieserviceService } from 'src/app/service/movieservice.service';
import { BookingserviceService } from 'src/app/service/bookingservice.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {


  maaveranposter:string="assets/images/maaveran poster.jpg"
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
  mobileNumber:any;
  selectedTiming: string = '';
  totalSeatsSelected: any;
  totalSeats: any;
  selectedSeats: any;
  selectedDate: any;
  username:any;
  userEmail:any;
  selectedMovie: any;
  shouldSubmit = false;
  bookingtik=false;
  name: any;
  numSeatsSelected: any;
  totalTicketPrice: any;
  totalTicketPrice2: any;
  discountAmount: any;
  selectedScreen: any;
  selectedTheater: any;
  
  invalidMobileNumber = false;
  myForm: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private formBuilder: FormBuilder,private _snackBar: MatSnackBar,private _dialog:MatDialog,public movieservice: MovieserviceService,public bookingservice: BookingserviceService,public dialogRef: MatDialogRef<PaymentComponent>){
    this.myForm = this.formBuilder.group({
      num: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    });
  
  }
  ngOnInit(): void {
    debugger
    this.getallmovies()
    debugger
    
    this.username=sessionStorage.getItem('username');
    this.userEmail=sessionStorage.getItem('userEmail');
    this.name = sessionStorage.getItem('userId');
    this.movie = this.data.row
    const date = new Date(this.data.selectedDate);
    this.selectedDate = date.toDateString();
   this.selectedMovie = this.data.movie;
    this.selectedTiming = this.data.selectedTiming
    this.selectedSeats = this.data.selectedSeats
    this.numSeatsSelected=this.data.numSeatsSelected
    this.totalTicketPrice = this.data.totalTicketPrice
    this.selectedScreen=this.data.selectedScreen
    
    this.selectedTheater=this.data.selectedTheater
    const pricePerSeat = 120;
    const discountedPricePerSeat = pricePerSeat * (1 - 0.1);
    const discountedPrice = discountedPricePerSeat * this.numSeatsSelected;
    const discountAmount = (pricePerSeat * this.numSeatsSelected) - discountedPrice;
    this.totalTicketPrice2 = discountedPrice;
    this.discountAmount = discountAmount;
    

   

    
    
    


  }
  validateMobileNumber(number: number) {
    const mobileNumber = String(number);
    if (mobileNumber.length === 11) {
      this.invalidMobileNumber = false;
    } else {
      this.invalidMobileNumber = true;
    }
  }
  
  getallmovies() {

   
    this.movieservice.getallmovies(this.movie)

      .subscribe(
        response => {
          this.movies = response;

        }
      )
  }
  ticket(row:any) {
    if (this.selectedSeats.length > 0) {
      this.dialogRef.close(PaymentComponent);
      
      const dialogRef = this._dialog.open(TicketComponent, {
        disableClose: true,
        data: { row, selectedTiming: this.selectedTiming,totalTicketPrice2:this.totalTicketPrice2,
          selectedSeats:this.selectedSeats,selectedDate:this.selectedDate,shouldSubmit:this.shouldSubmit = true,
          selectedTheater:this.selectedTheater,selectedScreen:this.selectedScreen,numSeatsSelected:this.numSeatsSelected} 
        
      });
    } else {
      this._snackBar.open('Please select at least one seat!', 'Close', { duration: 3000 });
    }
  }
  // onPaytmPayment() {
  //   debugger
  //   const paytmConfig = {
  //     "root": "",
  //     "flow": "DEFAULT",
  //     "data": {
  //         "orderId": "ORDER_ID",
  //         "token": "TOKEN",
  //         "tokenType": "TXN_TOKEN",
  //         "amount": "10.00"
  //     },
  //     "handler": {
  //         "notifyMerchant": function(eventName: any, data: any) {
  //             console.log(eventName, data);
  //         }
  //     }
  //   };

  //   if (typeof window.Paytm !== 'undefined') {
  //     window.Paytm.CheckoutJS.init(paytmConfig).then(function onSuccess() {
  //       window.Paytm.CheckoutJS.invoke();
  //     }).catch(function onError(error: any) {
  //       console.log(error);
  //     });
  //   }
  // }

}
