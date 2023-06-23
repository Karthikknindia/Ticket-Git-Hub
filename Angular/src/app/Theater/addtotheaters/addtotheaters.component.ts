import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AddmoviesComponent } from 'src/app/Movies/addmovies/addmovies.component';
import { movies } from 'src/app/models/movies.model';
import { theaters } from 'src/app/models/theaters.model';
import { MovieserviceService } from 'src/app/service/movieservice.service';
import { TheaterserviceService } from 'src/app/service/theaterservice.service';

@Component({
  selector: 'app-addtotheaters',
  templateUrl: './addtotheaters.component.html',
  styleUrls: ['./addtotheaters.component.css']
})
export class AddtotheatersComponent {
  form!: FormGroup;
  selectedShowTiming: string;
  selectedShowTimingLabel: string;

  is8amChecked: boolean = false;
  is11amChecked: boolean = false;
  is2pmChecked: boolean = false;
  is7pmChecked: boolean = false;
  is10pmChecked: boolean = false;

  theaters: theaters[] = [];
  theater: theaters = {

    theater_id: 0,
    theater_name: '',
    theater_capacity: 0,
    theater_location: '',
    theater_screen: '',
    theater_status: '',
    theater_datetime: new Date(),
    theater_createdate: new Date(),
    theater_updatedate: new Date(),

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
  selectedTheater?: string;
  selectedMovie?: string;
  selectedScreen?:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private theaterservice: TheaterserviceService, private _dialog: MatDialog, private movieservice: MovieserviceService, private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<AddmoviesComponent>) {
    this.selectedShowTiming = '';
    this.selectedShowTimingLabel = '';
  }

  ngOnInit(): void {

    this.getallmovies()
    this.getalltheaters()
    this.movie = this.data.row




  }

  selectedFileName: string = 'No file chosen...';
  isFileSelected: boolean = false;
  selectedFileName2: string = 'No file chosen...';
  isFileSelected2: boolean = false;

  getTheaterScreens(selectedTheater: any): number[] {
    const selectedTheaterObj = this.theaters.find(theater => theater.theater_name === selectedTheater);
    if (selectedTheaterObj) {
      const totalScreens = Number(selectedTheaterObj.theater_screen);
      return Array.from({ length: totalScreens }, (_, index) => index + 1);
    }
    return [];
  }
  
  
  
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




  getalltheaters() {
    debugger
    console.log(this.theater.theater_name)
    this.theaterservice.getalltheaters(this.theater)

      .subscribe(
        response => {
          this.theaters = response;
          this.dataSource.data = this.theaters;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      )
  }
  getallmovies() {
    debugger
    console.log(this.movie.movie_name)
    this.movieservice.getallmovies(this.movie)

      .subscribe(
        response => {
          this.movies = response;

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


  
//   onSubmit() {
//     debugger;
//     if (this.movie.movie_id === 0) {
//       const existingTheater = this.movies.find(movie =>
//         movie.movie_theater.split(',').map(t => t.trim()).includes(this.movie.movie_theater.trim()) &&
//         movie.movie_screen.toString() === this.movie.movie_screen.toString()
//       );
  
//       if (existingTheater) {
//         const conflictingMovie = this.movies.find(movie =>
//           movie.movie_theater.split(',').map(t => t.trim()).includes(this.movie.movie_theater.trim()) &&
//           movie.movie_screen.toString() === this.movie.movie_screen.toString() &&
//           movie.movie_name !== this.movie.movie_name
//         );
  
//         const errorMessage = conflictingMovie
//           ? `This theater and screen are already booked by the movie "${conflictingMovie.movie_name}".`
//           : 'This theater and screen are already booked by another movie.';
  
//         this.openSnackBar(errorMessage, 'OK');
//         return; 
//       }
//     }
  
//     if (this.movie.movie_id === 0) {
      
//       const existingMovie = this.movies.find(movie =>
//         movie.movie_name === this.movie.movie_name
//       );
  
//       if (existingMovie) {
        
//         this.movie.movie_id = existingMovie.movie_id;
//         this.movie.movie_poster = existingMovie.movie_poster;
//         this.movie.movie_thumbnail = existingMovie.movie_thumbnail;
//         this.movie.movie_categories = existingMovie.movie_categories;
//         this.movie.movie_director = existingMovie.movie_director;
//         this.movie.movie_timeduration = existingMovie.movie_timeduration;
//         this.movie.movie_ytlink = existingMovie.movie_ytlink;
//         this.movie.movie_cast = existingMovie.movie_cast;
//         this.movie.movie_screen = this.movie.movie_screen.toString();
//         const existingScreens = existingMovie.movie_screen ? existingMovie.movie_screen.split(',').map(s => s.trim()) : [];
// const newScreens = this.movie.movie_screen.split(',').map(s => s.trim());
// const uniqueScreens = Array.from(new Set([...existingScreens, ...newScreens]));
// this.movie.movie_screen = uniqueScreens.join(', ').toString();
  
       
//         const existingTheaters = existingMovie.movie_theater ? existingMovie.movie_theater.split(',').map(t => t.trim()) : [];
//         const newTheaters = this.movie.movie_theater.split(',').map(t => t.trim());
//         const uniqueTheaters = Array.from(new Set([...existingTheaters, ...newTheaters]));
//         this.movie.movie_theater = uniqueTheaters.join(existingTheaters.length > 0 ? ', ' : '');
  
//         this.movieservice.updatemovie(this.movie).subscribe(
//           response => {
//             console.log('Movie updated successfully');
//             this.getallmovies();
//             this.dialogRef.close(AddmoviesComponent);
//             this._snackBar.open('Updated successfully.', 'OK', { duration: 3000 });
//           },
//           error => {
//             console.log('Error updating movie: ', error);
//           }
//         );
//       } else {
       
//         this.movieservice.addmovie(this.movie).subscribe(
//           response => {
//             if (response.status === "200") {
//               this.getallmovies();
//               this.dialogRef.close(AddmoviesComponent);
//               this._snackBar.open('Added successfully.', 'OK', { duration: 3000 });
//               location.reload();
//             } else {
//               this.openSnackBar('Not added successfully.', 'OK');
//             }
//           }
//         );
//       }
//     } else {
     
//       this.movieservice.updatemovie(this.movie).subscribe(
//         response => {
//           console.log('Movie updated successfully');
//           this.getallmovies();
//           this.dialogRef.close(AddmoviesComponent);
//           this._snackBar.open('Updated successfully.', 'OK', { duration: 3000 });
//         },
//         error => {
//           console.log('Error updating movie: ', error);
  
//         }
//       );
//     }
//   }


onSubmit() {
  debugger;
  if (this.movie.movie_id === 0) {
    
    const existingTheater = this.movies.find(movie =>
      
      movie.movie_theater.split(',').map(t => t.trim()).includes(`${this.movie.movie_theater.trim()} / ${this.movie.movie_screen.toString()}`) 
      
    );
  
    if (existingTheater) {
      const conflictingMovie = this.movies.find(movie =>
        movie.movie_theater.split(',').map(t => t.trim()).includes(`${this.movie.movie_theater.trim()} / ${this.movie.movie_screen.toString()}`) 
        
      );
  
      const errorMessage = conflictingMovie
        ? `This theater Screen is already booked for the movie "${conflictingMovie.movie_name}".`
        : 'This theater is already booked for another movie.';
  
      this.openSnackBar(errorMessage, 'OK');
      return;
    }
  }
  

  

  if (this.movie.movie_id === 0) {
    
    const existingMovie = this.movies.find(movie =>
      movie.movie_name === this.movie.movie_name
    );

    if (existingMovie) {
      
      this.movie.movie_id = existingMovie.movie_id;
      this.movie.movie_poster = existingMovie.movie_poster;
      this.movie.movie_thumbnail = existingMovie.movie_thumbnail;
      this.movie.movie_categories = existingMovie.movie_categories;
      this.movie.movie_director = existingMovie.movie_director;
      this.movie.movie_timeduration = existingMovie.movie_timeduration;
      this.movie.movie_ytlink = existingMovie.movie_ytlink;
      this.movie.movie_cast = existingMovie.movie_cast;
      this.movie.movie_screen = this.movie.movie_screen.toString();
      const existingScreens = existingMovie.movie_screen ? existingMovie.movie_screen.split(',').map(s => s.trim()) : [];
      const newScreens = this.movie.movie_screen.split(',').map(s => s.trim());
      
      const uniqueScreens = Array.from(new Set([...existingScreens, ...newScreens]));
      
      
      uniqueScreens.forEach(screen => {
        console.log(screen);
      });
      

     
const existingTheaters = existingMovie.movie_theater ? existingMovie.movie_theater.split(',').map(t => t.trim()) : [];
const newTheaters = this.movie.movie_theater.split(',').map(t => t.trim());
const updatedTheaters = newTheaters.map(theater => `${theater} / ${this.movie.movie_screen}`);
const uniqueTheaters = Array.from(new Set([...existingTheaters, ...updatedTheaters]));
this.movie.movie_theater = uniqueTheaters.join(existingTheaters.length > 0 ? ', ' : '');



      this.movieservice.updatemovie(this.movie).subscribe(
        response => {
          console.log('Movie updated successfully');
          this.getallmovies();
          this.dialogRef.close(AddmoviesComponent);
          this._snackBar.open('Updated successfully.', 'OK', { duration: 3000 });
        },
        error => {
          console.log('Error updating movie: ', error);
        }
      );
    } else {
     
      this.movieservice.addmovie(this.movie).subscribe(
        response => {
          if (response.status === "200") {
            this.getallmovies();
            this.dialogRef.close(AddmoviesComponent);
            this._snackBar.open('Added successfully.', 'OK', { duration: 3000 });
            location.reload();
          } else {
            this.openSnackBar('Not added successfully.', 'OK');
          }
        }
      );
    }
  } else {
   
    this.movieservice.updatemovie(this.movie).subscribe(
      response => {
        console.log('Movie updated successfully');
        this.getallmovies();
        this.dialogRef.close(AddmoviesComponent);
        this._snackBar.open('Updated successfully.', 'OK', { duration: 3000 });
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
