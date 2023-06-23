import { Component, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { bookings } from 'src/app/models/bookings.model';
import { MovieserviceService } from 'src/app/service/movieservice.service';
import { BookingserviceService } from 'src/app/service/bookingservice.service';

@Component({
  selector: 'app-allbookings',
  templateUrl: './allbookings.component.html',
  styleUrls: ['./allbookings.component.css']
})
export class AllbookingsComponent {

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
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
  showLoader: boolean = true;
  displayedColumns: string[] = ['sno', 'booking_name','booking_movie','booking_email','booking_date','booking_seats'];
  dataSource = new MatTableDataSource<bookings>(this.bookings);
  constructor(public movieservice: MovieserviceService, public bookingservice: BookingserviceService, private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    debugger
    // setTimeout(() => {
    //   this.showLoader = false; // Hide the loader after 2 seconds
    // }, 2000);
    this.getallbooking()
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  
  getallbooking() {
  debugger
    this.bookingservice.getallbooking(this.booking)

      .subscribe(
        response => {
          this.bookings = response;
          this.dataSource.data = this.bookings;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
          console.log(response)
        }
      )
  }
}
