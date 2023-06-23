import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddmoviesComponent } from '../addmovies/addmovies.component';
import { DeletemovieComponent } from '../deletemovie/deletemovie.component';

import { ViewmovieComponent } from '../viewmovie/viewmovie.component';
import { movies } from 'src/app/models/movies.model';
import { MovieserviceService } from 'src/app/service/movieservice.service';
import { AddonlymoviesComponent } from '../addonlymovies/addonlymovies.component';


export interface PeriodicElement {
  name: string;
  position: number;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Leo', action: '' },
  { position: 2, name: 'Interstellar', action: '' },
  { position: 3, name: 'Avengers', action: '' },
  { position: 4, name: 'Game Of Thrones', action: '' },
  { position: 5, name: 'Dia', action: '' },
  { position: 6, name: 'Maaveran', action: '' },
  { position: 7, name: 'Hridhayam', action: '' },
  { position: 8, name: 'Jailer', action: '' },
];

@Component({
  selector: 'app-movieslist',
  templateUrl: './movieslist.component.html',
  styleUrls: ['./movieslist.component.css']
})
export class MovieslistComponent implements OnInit {
  title = 'Ticket';
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



  displayedColumns: string[] = ['sno', 'movie_name', 'action'];
  dataSource = new MatTableDataSource<movies>(this.movies);
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  sort: any;

  ngOnInit(): void {
   
   this.getallmovies();
  }

  constructor(private _dialog:MatDialog,private movieservice:MovieserviceService,public dialogRef: MatDialogRef<MovieslistComponent>) {}

  getallmovies(){
    console.log(this.movie.movie_name)
    this.movieservice.getallmovies(this.movie)
    
    .subscribe(
      response=>{
        this.movies=response;
        this.dataSource.data = this.movies;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }
    )
  }
  updatemovie(row:any) {
    
    const dialogRef = this._dialog.open(AddmoviesComponent, {
      disableClose: true,
      data: { row }
    });
  }
  addmovie(){
    this.currentNo++;
    this._dialog.open(AddonlymoviesComponent,{
      disableClose: true,
    })
    this.dialogRef.close(MovieslistComponent);
  }
  deletemovie(movie_id:number){
     
    this._dialog.open(DeletemovieComponent)
    .afterClosed()
    .subscribe(
       (deletemovie: boolean) => {
          if (deletemovie) {
             this.movieservice.deletemovie(movie_id)
             .subscribe(
                response=>{
                   this.getallmovies();
                },
                error=>{
                   console.log(error); 
                },
                
             );
          } 
       }
    );
  }
  viewmovie(row: any) {
    
    const dialogRef = this._dialog.open(ViewmovieComponent, {
      disableClose: true,
      data: { row }
    });
  }
  
}
