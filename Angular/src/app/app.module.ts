import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TheatresComponent } from './Theater/theatres/theatres.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgIf } from '@angular/common';
import { SeatsComponent } from './Theater/seats/seats.component';
import { TicketComponent } from './Bookings/ticket/ticket.component';
import {MatSelectModule} from '@angular/material/select';

import { BookingsComponent } from './Bookings/bookings/bookings.component';
import { LoginComponent } from './Logins/login/login.component';
import { UserComponent } from './Logins/user/user.component';
import { AdminComponent } from './Logins/admin/admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddmoviesComponent } from './Movies/addmovies/addmovies.component';
import { MovieslistComponent } from './Movies/movieslist/movieslist.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './module/material.module';
import { AddtheatorComponent } from './Theater/addtheator/addtheator.component';
import { TheaterlistComponent } from './Theater/theaterlist/theaterlist.component';
import { ViewmovieComponent } from './Movies/viewmovie/viewmovie.component';
import { ViewtheaterComponent } from './Theater/viewtheater/viewtheater.component';
import { DeletetheaterComponent } from './Theater/deletetheater/deletetheater.component';
import { DeletemovieComponent } from './Movies/deletemovie/deletemovie.component';

import { RegisterComponent } from './Logins/register/register.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { PopupComponent } from './Logins/popup/popup.component';
import { InvalidpopupComponent } from './Logins/invalidpopup/invalidpopup.component';

import { AlredyexistComponent } from './Logins/alredyexist/alredyexist.component';
import { LoginService } from './service/login.service';
import { TheateraddedpopupComponent } from './Theater/theateraddedpopup/theateraddedpopup.component';
import { PaymentComponent } from './Bookings/payment/payment.component';
import { AllbookingsComponent } from './Bookings/allbookings/allbookings.component';







@NgModule({
  declarations: [
    AppComponent,
    TheatresComponent,
   
    SeatsComponent,
    TicketComponent,
    
    
    BookingsComponent,
    LoginComponent,
    UserComponent,
    AdminComponent,
    AddmoviesComponent,
    MovieslistComponent,
    AddtheatorComponent,
    TheaterlistComponent,
    ViewmovieComponent,
    ViewtheaterComponent,
    DeletetheaterComponent,
    DeletemovieComponent,
 
    RegisterComponent,
  
    PopupComponent,
    InvalidpopupComponent,
    
    AlredyexistComponent,
    TheateraddedpopupComponent,
    PaymentComponent,
    AllbookingsComponent,
    
   
    
    
    
    
    
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    NgbModule,
    NgbCarouselModule,
    NgIf,
    ReactiveFormsModule,
    MatSelectModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
   
    

    
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
