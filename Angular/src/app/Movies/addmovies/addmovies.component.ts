import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatCheckbox } from '@angular/material/checkbox';

import { MatTableDataSource } from '@angular/material/table';
import { theaters } from 'src/app/models/theaters.model';
import { movies } from 'src/app/models/movies.model';
import { TheaterserviceService } from 'src/app/service/theaterservice.service';
import { MovieserviceService } from 'src/app/service/movieservice.service';


@Component({
  selector: 'app-addmovies',
  templateUrl: './addmovies.component.html',
  styleUrls: ['./addmovies.component.css']
})
export class AddmoviesComponent implements OnInit {

  title = 'Ticket';

  



  form!: FormGroup;
  selectedShowTiming: string;
  selectedShowTimingLabel: string;

  is8amChecked: boolean = false;
  is11amChecked: boolean = false;
  is2pmChecked: boolean = false;
  is7pmChecked: boolean = false;
  is10pmChecked: boolean = false;
  
  theaters:theaters[]=[];
  theater:theaters={

    theater_id:0,
    theater_name : '',
    theater_capacity:0,
    theater_location:'',
    theater_screen:null,
    theater_status:'',
    theater_datetime:new Date(),
    theater_createdate:new Date(),
    theater_updatedate:new Date(),
    
  }
  
  selectedTheater!: string;

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
  currentNo = 1;
  dataSource = new MatTableDataSource<theaters>(this.theaters);
  sort: any;
  paginator: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private _dialog: MatDialog, private _snackBar: MatSnackBar, 
  private theaterservice: TheaterserviceService,public movieservice:MovieserviceService, 
  public dialog: MatDialog,public dialogRef: MatDialogRef<AddmoviesComponent>) {
    this.selectedShowTiming = '';
    this.selectedShowTimingLabel = '';

  }
  ngOnInit(): void {
    this.getallmovies()
    this.getalltheaters()
   
    this.movie = this.data.row
   
   
  }
  onFileChange(event : any) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
  
      this.movie.movie_poster = reader.result as string;
      
    };
  
    reader.readAsDataURL(file);
  }
  onFileChange2(event : any) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onloadend = () => {
    
     
      this.movie.movie_thumbnail=reader.result as string;
    };
  
    reader.readAsDataURL(file);
  }
  
 

  getalltheaters(){
    console.log(this.theater.theater_name)
    this.theaterservice.getalltheaters(this.theater)
    
    .subscribe(
      response=>{
        this.theaters=response;
        this.dataSource.data = this.theaters;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }
    )
  }
  getallmovies(){
    console.log(this.movie.movie_name)
    this.movieservice.getallmovies(this.movie)
    
    .subscribe(
      response=>{
        this.movies=response;
        
      }
    )
  }

//   updateShowTiming(checkbox: MatCheckbox, timing: string, text: string) {
    
//     if (checkbox.checked) {
//       this.selectedShowTiming += `${timing}, `;
//       this.selectedShowTimingLabel += `${text}, `;
//     } else {
//       this.selectedShowTiming = this.selectedShowTiming.replace(`${timing}, `, '');
//       this.selectedShowTimingLabel = this.selectedShowTimingLabel.replace(`${text}, `, '');
//     }

//     this.movie.movie_showtiming = this.selectedShowTiming.trim();

    
//     checkbox.checked = this.selectedShowTiming.includes(timing);
// }
updateShowTiming(checkbox: MatCheckbox, timing: string, text: string) {
    
  if (checkbox.checked) {
    if (this.selectedShowTiming) {
      this.selectedShowTiming += `, ${timing}`;
      this.selectedShowTimingLabel += `, ${text}`;
    } else {
      this.selectedShowTiming += timing;
      this.selectedShowTimingLabel += text;
    }
  } else {
    this.selectedShowTiming = this.selectedShowTiming.replace(`, ${timing}`, '').replace(`${timing}, `, '').replace(timing, '');
    this.selectedShowTimingLabel = this.selectedShowTimingLabel.replace(`, ${text}`, '').replace(`${text}, `, '').replace(text, '');
  }

  this.movie.movie_showtiming = this.selectedShowTiming.trim();

  checkbox.checked = this.selectedShowTiming.includes(timing);
}


  onSubmit() {
    
    if (this.movie.movie_id === 0) {
      this.movieservice.addmovie(this.movie)
        .subscribe(
          response => {


            if (response.status == "200") {
              this.getallmovies()
              this.dialogRef.close(AddmoviesComponent);
              
              
              this._snackBar.open('Added successful.', 'OK', { duration: 3000 });
              location.reload();
              
            }
            else {
              this.openSnackBar('Not Added successful.', 'OK');
            }
          }
        );
    } else {
     
      this.movieservice.updatemovie(this.movie)
        .subscribe(
          response => {

            console.log('movie updated successfully');

            this.getallmovies();
            this.dialogRef.close(AddmoviesComponent);
            
            this._snackBar.open('Updated successful.', 'OK', { duration: 3000 });
            
          },
          error => {

            console.log('Error updating movie: ', error);
          }
        );
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
