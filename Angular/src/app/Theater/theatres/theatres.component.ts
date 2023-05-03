import { Component,Inject,inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SeatsComponent } from '../seats/seats.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


import { MatDatepickerInputEvent } from '@angular/material/datepicker';


import { theaters } from 'src/app/models/theaters.model';
import { movies } from 'src/app/models/movies.model';
import { TheaterserviceService } from 'src/app/service/theaterservice.service';
import { MovieserviceService } from 'src/app/service/movieservice.service';
@Component({
  selector: 'app-theatres',
  templateUrl: './theatres.component.html',
  styleUrls: ['./theatres.component.css']
})

export class TheatresComponent {

  panelOpenState = false;
  minDate = new Date();
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


  movies:movies[]=[];
  ytlis!:[];
  movie:movies={
  movie_id: 0,
  movie_name: '',
  movie_categories: '',
  movie_theater: '',
  movie_poster: '',
  movie_showtiming: '',
  movie_status: '',
  movie_createdate: new Date,
  movie_updatedate: new Date,
  movie_timeduration: '',
  movie_director: '',
  movie_cast: '',
  movie_thumbnail: '',
  movie_ytlink: ''
}
  selectedDate: any;
  maxDate: Date;
  selectedTheater: any;
  selectedMovie!: string ;
  selectedTiming: string = '';
  theatersForSelectedMovie: movies[] = [];

  displayedColumns: string[] = ['theater_name'];
  dataSource = new MatTableDataSource<theaters>(this.theaters);
  theatercapacity!: number;
  
  


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _dialog: MatDialog, private theaterservice: TheaterserviceService,private movieservice:MovieserviceService,public dialogRef: MatDialogRef<TheatresComponent>) {
    var oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 4);
    this.maxDate = oneWeekFromNow;
  }
  

  onDateSelected(event: MatDatepickerInputEvent<Date>) {
    if (event?.value != null) {
      this.selectedDate = event.value;
    }
  }
 

  
  ngOnInit(): void {
    this.getalltheaters();

    this.getallmovies();
    
    this.movie = this.data.row
  //   const date = new Date(this.data.selectedDate);
  //   this.selectedDate = date.toDateString();
  //  this.selectedMovie = this.data.movie;
  //   this.selectedTiming = this.data.selectedTiming
  }
  getallmovies(){
    
    this.movieservice.getallmovies(this.movie)
    
    .subscribe(
      response=>{
        this.movies=response;
      }
    )
  }

  
  gotopage(timing: string,row:any) {
  debugger
  
    this.selectedTiming = timing; 
    
    this.dialogRef.close(TheatresComponent);
    const dialogRef = this._dialog.open(SeatsComponent, {
      disableClose: true,
      data: { row, selectedTiming: this.selectedTiming,selectedDate : this.selectedDate} 
    });
  }

  // gotopage(timing: string, row: any) {
  //   debugger;
  //   const theaterId = this.movie.movie_id;
  //   const selectedTheater = this.theaters.find(t => t.theater_id === theaterId);
  //   if (selectedTheater) {
  //     this.selectedTiming = timing; 
  //     this.theatercapacity = selectedTheater.theater_capacity;
  //     this.dialogRef.close(TheatresComponent);
  //     const dialogRef = this._dialog.open(SeatsComponent, {
  //       disableClose: true,
  //       data: { row, selectedTiming: this.selectedTiming, selectedDate: this.selectedDate, theatercapacity:this.theatercapacity }  
  //     });
  //   } else {
  //     console.error(`Theater with ID ${theaterId} not found.`);
  //   }
  // }
  
  

  getalltheaters() {
   
    
    this.theaterservice.getalltheaters(this.theater)

      .subscribe(
        response => {
          this.theaters = response;
          this.dataSource.data = this.theaters;

        }
      )
  }
 

}
