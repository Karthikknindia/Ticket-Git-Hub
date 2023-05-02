import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {MatSelectModule} from '@angular/material/select';


import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { AllbookingsComponent } from 'src/app/Bookings/allbookings/allbookings.component';
import { BookingsComponent } from 'src/app/Bookings/bookings/bookings.component';
import { AddmoviesComponent } from 'src/app/Movies/addmovies/addmovies.component';
import { DeletemovieComponent } from 'src/app/Movies/deletemovie/deletemovie.component';
import { MovieslistComponent } from 'src/app/Movies/movieslist/movieslist.component';
import { ViewmovieComponent } from 'src/app/Movies/viewmovie/viewmovie.component';
import { TheaterlistComponent } from 'src/app/Theater/theaterlist/theaterlist.component';
import { TheatresComponent } from 'src/app/Theater/theatres/theatres.component';
import { logins } from 'src/app/models/logins.model';
import { movies } from 'src/app/models/movies.model';
import { MovieserviceService } from 'src/app/service/movieservice.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  
})
export class AdminComponent {
  title = 'Ticket';

  
  
  logo:string="assets/logo edit.png"
  
  logins:logins[]=[];
  login:logins={
    login_id: 0,
    login_name: '',
    login_email: '',
    login_password: '',
    login_status: '',
    login_createdate: new Date("Fri Dec 08 2019 07:44:57")

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
  
  username:any;
  userEmail:any;
  loginid:any;

  constructor(private _dialog:MatDialog,private LoginService: LoginService,private router: Router,private movieservice:MovieserviceService,private sanitizer: DomSanitizer,private cdr: ChangeDetectorRef){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    
  }
  
  getSafeUrl(link: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
  ngOnInit(): void {
   
    this.getallmovies();
    this.updateuser();
    this.username=sessionStorage.getItem('username');
    this.userEmail=sessionStorage.getItem('userEmail');
    this.loginid=sessionStorage.getItem('loginid');
  }
 
  getallmovies(){
    console.log(this.movie.movie_name)
    this.movieservice.getallmovies(this.movie)

    .subscribe(
      response=>{
        this.movies=response;
        console.log(response)
      }
    )
  }

  
  openTheatresForm(row: any){
   
    const dialogRef = this._dialog.open(TheatresComponent, {
      disableClose: true,
      data: { row }
    });
   
  }

  openBookings(){
    this._dialog.open(BookingsComponent,{
      disableClose: true,
    })
  }
  openAllBookings(){
    this._dialog.open(AllbookingsComponent,{
      disableClose: true,
    })
  }
  openMovies(){
    this._dialog.open(MovieslistComponent,{
      disableClose: true,
    })
  }

  addmovies(){
    this._dialog.open(AddmoviesComponent,{
      disableClose: true,
    })
  }

  opentheaters(){
    this._dialog.open(TheaterlistComponent,{
      disableClose: true,
    })
  }
  updatemovie(row:any) {
    
    const dialogRef = this._dialog.open(AddmoviesComponent, {
      disableClose: true,
      data: { row }
    });
  }
  
  deletemovie(movie_id:number){
   
    this._dialog.open(DeletemovieComponent, {
      disableClose: true,
      
    })
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
  
  // logout() {
  //   debugger
  //   localStorage.removeItem('token');
  //   const loginid = sessionStorage.getItem('login');
  //   this.LoginService.logout(loginid)

  //   .subscribe(
  //     response=>{
  //       this.login=response;
  //       console.log(response)
  //     }
  //   )
  //   // this.router.navigate(['/login']);
   
  // }
  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    
    localStorage.removeItem('token');
    const loginid = sessionStorage.getItem('loginid');
    
    if (loginid !== null) {
      
        this.LoginService.updateuser(Number(loginid)).subscribe(
            response => {
                this.login = response;
                console.log(response);
               
            }
            
        );
        this.router.navigate(['/login']);
    } else {
        console.log('Login ID is null');
    }
}
 updateuser(){
  
  const loginid = sessionStorage.getItem('loginid');
    this.LoginService.updateuser(Number(loginid))
    .subscribe(
      response=>{
        this.login=response;
        console.log(response)
      }
    )
  }
}