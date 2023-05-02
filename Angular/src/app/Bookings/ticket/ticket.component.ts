import { Component, Inject, Renderer2, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as nodemailer from 'nodemailer';

import { bookings } from 'src/app/models/bookings.model';
import { movies } from 'src/app/models/movies.model';
import { theaters } from 'src/app/models/theaters.model';
import { BookingserviceService } from 'src/app/service/bookingservice.service';
import { MovieserviceService } from 'src/app/service/movieservice.service';




@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent {

  panelOpenState = false;
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
  filteredTheaters: theaters[] = [];
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
  selectedSeats: any;
  selectedDate: any;
  username:any;
  userEmail:any;
  selectedMovie: any;
  shouldSubmit = false;
  bookingtik=false;
  totalTicketPrice2: any;
  amountstring: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private renderer: Renderer2, private _dialog: MatDialog, public movieservice: MovieserviceService, public bookingservice: BookingserviceService, private _snackBar: MatSnackBar) {

  }
  name: any;
  ngOnInit(): void {
    debugger
    this.getallmovies()
    this.getallbooking()
    
    this.username=sessionStorage.getItem('username');
    this.userEmail=sessionStorage.getItem('userEmail');
    this.name = sessionStorage.getItem('userId');
    this.movie = this.data.row
   this.selectedMovie = this.data.movie;
    this.selectedTiming = this.data.selectedTiming
    this.selectedSeats = this.data.selectedSeats
    this.totalTicketPrice2=this.data.totalTicketPrice2
    debugger
    
   this.bookingtik=this.data.bookingtik
    if (this.bookingtik) {
      this.booking=this.data.row
    }
    const date = new Date(this.data.selectedDate);
    this.selectedDate = date.toDateString();
    // this.selectedDate=this.data.selectedDate
    // console.log(this.selectedDate);
    this.shouldSubmit=this.data.shouldSubmit
    if (this.shouldSubmit) {
      this.onSubmit();
    }
    
    
   
  }
  
  @ViewChild('ticket', { static: true })
  ticketElement!: ElementRef;
  getallbooking() {
  
    this.bookingservice.getallbooking(this.booking)

      .subscribe(
        response => {
          this.bookings = response;
          console.log(response)
        }
      )
  }

  getallmovies() {

   
    this.movieservice.getallmovies(this.movie)

      .subscribe(
        response => {
          this.movies = response;

        }
      )
  }
  // downloadTicket() {
  //   const doc = new jsPDF({});
  //   const ticket = this.ticketElement.nativeElement;
  //   doc.html(ticket.innerHTML, {
  //     callback: function (pdf) {
  //       pdf.save("ticket.pdf");
  //     }
  //   });
  // }

  downloadTicket() {
    debugger
    const ticket = this.ticketElement.nativeElement;
    html2canvas(ticket).then(canvas => {
      const screenshotUrl = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(screenshotUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = imgProps.width;
      const imgHeight = imgProps.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const xPos = (pdfWidth - imgWidth * ratio) / 2;
      const yPos = (pdfHeight - imgHeight * ratio) / 2;
      pdf.addImage(screenshotUrl, 'PNG', xPos, yPos, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${this.booking.booking_movie}_ticket.pdf`);
    });
  }

  // downloadTicketAndSendMail() {
  //   // Download the ticket PDF
  //   const ticket = this.ticketElement.nativeElement;
  //   html2canvas(ticket).then(canvas => {
  //     const screenshotUrl = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const imgProps = pdf.getImageProperties(screenshotUrl);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = pdf.internal.pageSize.getHeight();
  //     const imgWidth = imgProps.width;
  //     const imgHeight = imgProps.height;
  //     const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
  //     const xPos = (pdfWidth - imgWidth * ratio) / 2;
  //     const yPos = (pdfHeight - imgHeight * ratio) / 2;
  //     pdf.addImage(screenshotUrl, 'PNG', xPos, yPos, imgWidth * ratio, imgHeight * ratio);
  //     const pdfName = `${this.booking.booking_movie}_ticket.pdf`;
  //     const pdfAttachment = {
  //       fileName: pdfName,
  //       content: pdf.output('blob')
  //     };
  //     // Send the email with the ticket PDF attachment
  //     this.sendMail('recipient@example.com', 'Movie Ticket', 'Please find attached your movie ticket.', pdfAttachment);
  //   });
  // }

  // sendMail(to: string, subject: string, body: string, attachment: { fileName: string, content: any }) {
  //   // Create a transporter object using SMTP transport
  //   const transporter = nodemailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 587,
  //     secure: false,
  //     requireTLS: true,
  //     auth: {
  //       user: 'share2karthikkn@gmail.com',
  //       pass: 'karthikdhoni'
  //     }
  //   });

  //   // Specify the recipient(s) of the email
  //   const mailOptions = {
  //     from: 'share2karthikkn@gmail.com',
  //     to: 'karthikknmi@gmail.com',
  //     subject: subject,
  //     text: body,
  //     attachments: [
  //       {
  //         filename: attachment.fileName,
  //         content: attachment.content
  //       }
  //     ]
  //   };

  //   // Send the email
  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });
  // }

  
  // sentMail(subject: string, body: string, attachment: { fileName: string, content: any }) {
   
  //   console.log(`Email sent with subject "${subject}" and attachment "${attachment.fileName}".`);
  // }
  

  onSubmit() {
    debugger
    this.booking.booking_name = this.username;
    this.booking.booking_email=this.userEmail;
    this.booking.booking_movie=this.movie.movie_name;
    this.booking.booking_poster=this.movie.movie_poster;
    let seatsString = JSON.stringify(this.data.selectedSeats);
    this.booking.booking_seats = seatsString;
    this.booking.booking_theater=this.movie.movie_theater;
    this.booking.booking_showtime=this.selectedTiming;
    this.booking.booking_date=this.selectedDate;
    let amountstring = JSON.stringify(this.data.totalTicketPrice2);
    this.booking.booking_amount=amountstring
    if (this.booking.booking_id === 0) {
      this.bookingservice.addticket(this.booking)
        .subscribe(
          response => {


            if (response.status == "200") {
              this.getallbooking()



              this._snackBar.open('Ticket Booked Successful.', 'OK', { duration: 3000 });
              

            }
            else {
              this._snackBar.open('Ticket not Booked .', 'OK', { duration: 3000 });
            }
          }
        );
    }
  }

   
  }


























function canvg(canvas: HTMLCanvasElement, innerHTML: string) {
  throw new Error('Function not implemented.');
}

