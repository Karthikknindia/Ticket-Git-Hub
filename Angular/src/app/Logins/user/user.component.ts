import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { DomSanitizer } from '@angular/platform-browser';
import { logins } from 'src/app/models/logins.model';
import { movies } from 'src/app/models/movies.model';
import { BookingsComponent } from 'src/app/Bookings/bookings/bookings.component';
import { TheatresComponent } from 'src/app/Theater/theatres/theatres.component';
import { LoginService } from 'src/app/service/login.service';
import { MovieserviceService } from 'src/app/service/movieservice.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  title = 'Ticket';
  logins: logins[] = [];
  login: logins = {
    login_id: 0,
    login_email: '',
    login_password: '',
    login_name: '',
    login_status: '',
    login_createdate: new Date("Fri Dec 08 2019 07:44:57")
  }
  movies:movies[]=[]
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


  myimage:string="assets/images/leo-fan-made-poster.png"
  myimage2:string="assets/images/wallpaperflare.com_wallpaper.jpg"
  myimage3:string="assets/images/13453.jpg"
  myimage4:string="assets/images/wp2131761.jpg"
  logo:string="assets/logo edit.png"
  dia:string="assets/images/dia.jpg"
  diaposter:string="assets/images/Dia-movie-is-now-streaming-on-Amazon-Prime-Video.jpg"
  maaveran:string="assets/images/maaveran.jpg"
  maaveranposter:string="assets/images/maaveran poster.jpg"
  hridhayam:string="assets/images/Hridayam-2.jpg"
  hridhayamposter:string="assets/images/hridhayam poster.jpg"
  jailer:string="assets/images/jailer.jpg"
  jailerposter:string="assets/images/jailer poster.jpg"
  


  leoposter:string="assets/images/vijay-leo-movie-stills-hd-wallpapers-1200px-4288182.jpg"
  interposter:string="assets/images/8e0dab8699be85720ce55845065bf6dc.jpg"
  avengerposter:string="assets/images/wallpapersden.com_avengers-endgame-international-poster_3378x5000.jpg"
  gameofthrones:string="assets/images/154641913.jpg"
  loginDetails: any;
 
  userId:any;
  username:any;
  userEmail:any;
  loginid: any;
  constructor(private route: ActivatedRoute,private Loginservice: LoginService,private _dialog:MatDialog,private LoginService:LoginService,private router: Router,private movieservice:MovieserviceService,private sanitizer: DomSanitizer,private cdr: ChangeDetectorRef){

  }
 ngOnInit(): void {
  // localStorage.removeItem('isLoggedIn');
 
  this.username=sessionStorage.getItem('username');
  this.userEmail=sessionStorage.getItem('userEmail');
  this.loginid=sessionStorage.getItem('loginid');

  // this.route.paramMap.subscribe(params => {
  //   debugger
  //   this.userId = params.get('userId');
  //   console.log(this.userId); // will print the user ID in the console
  //   // Call a service to get the user details using the userId
  // });
    this.getallmovies();
    
   
this.updateuser();
 
    
  }
 getSafeUrl(link: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }
 getsingleuser(){
  this.LoginService.getsingleuser(this.login)
  .subscribe(
    response=>{
      this.logins=response;
      
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
  getallusers() {

    this.Loginservice.getallusers(this.login)
      .subscribe(
        response => {
          this.logins = response;
          this.login = {
            login_id: 0,
            login_email: '',
            login_password: '',
            login_name: '',
            login_status: '',
            login_createdate: new Date("Fri Dec 08 2019 07:44:57")
            
            
          }
         
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

  populateForm(login:logins){
    this.login=login;
      }

   logout() {
    localStorage.setItem('isLoggedIn', 'false');
        
        localStorage.removeItem('token');
        const loginid = sessionStorage.getItem('loginid');
        if (loginid !== null) {
            this.LoginService.logout(Number(loginid)).subscribe(
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
