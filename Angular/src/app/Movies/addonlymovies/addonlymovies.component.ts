import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { movies } from 'src/app/models/movies.model';
import { MovieserviceService } from 'src/app/service/movieservice.service';
import { AddmoviesComponent } from '../addmovies/addmovies.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { theaters } from 'src/app/models/theaters.model';
import { MatTableDataSource } from '@angular/material/table';
import { TheaterserviceService } from 'src/app/service/theaterservice.service';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-addonlymovies',
  templateUrl: './addonlymovies.component.html',
  styleUrls: ['./addonlymovies.component.css']
})
export class AddonlymoviesComponent {

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
    theater_screen:'',
    theater_status:'',
    theater_datetime:new Date(),
    theater_createdate:new Date(),
    theater_updatedate:new Date(),
    
  }
  movies:movies[]=[];
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
    movie_ytlink: '',
    movie_screen: ''
  }

currentNo = 1;
  dataSource = new MatTableDataSource<theaters>(this.theaters);
  sort: any;
  paginator: any;
  selectedTheater!: string;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,private theaterservice: TheaterserviceService,private _dialog:MatDialog,private movieservice:MovieserviceService,private _snackBar: MatSnackBar,public dialogRef: MatDialogRef<AddmoviesComponent> ) {
  this.selectedShowTiming = '';
    this.selectedShowTimingLabel = '';
}

ngOnInit(): void {
  this.getallmovies()
  this.movie = this.data.row
 
  
 
 
}

selectedFileName: string = 'No file chosen...';
isFileSelected: boolean = false;
selectedFileName2: string = 'No file chosen...';
isFileSelected2: boolean = false;


onFileChange(event: any): void {
  const file = event.target.files[0];
  const reader = new FileReader();
  if (file) {
    this.isFileSelected = true;
    this.selectedFileName = file.name;
    reader.onloadend = () => {

      this.movie.movie_poster = reader.result as string;
      
    };
  
    reader.readAsDataURL(file);
  } else {
    this.isFileSelected = false;
    this.selectedFileName = 'No file chosen...';
  }
}
// onFileChange(event : any) {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onloadend = () => {

//     this.movie.movie_poster = reader.result as string;
    
//   };

//   reader.readAsDataURL(file);
// }
// onFileChange2(event : any) {
//   const file = event.target.files[0];
//   const reader = new FileReader();

//   reader.onloadend = () => {
  
   
//     this.movie.movie_thumbnail=reader.result as string;
//   };

//   reader.readAsDataURL(file);
// }
onFileChange2(event: any): void {
  const file = event.target.files[0];
  const reader = new FileReader();
  if (file) {
    this.isFileSelected2 = true;
    this.selectedFileName2 = file.name;
    reader.onloadend = () => {

      this.movie.movie_thumbnail = reader.result as string;
      
    };
  
    reader.readAsDataURL(file);
  } else {
    this.isFileSelected2 = false;
    this.selectedFileName2 = 'No file chosen...';
  }
}
clearFile2() {
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = ''; 
    this.selectedFileName2 = 'No file chosen';
    this.isFileSelected2 = false;
  }
}
clearFile() {
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput) {
    fileInput.value = ''; 
    this.selectedFileName = 'No file chosen';
    this.isFileSelected = false;
  }
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


