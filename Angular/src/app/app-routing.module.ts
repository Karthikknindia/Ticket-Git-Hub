import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeatsComponent } from './Theater/seats/seats.component';
import { TicketComponent } from './Bookings/ticket/ticket.component';
import { LoginComponent } from './Logins/login/login.component';
import { UserComponent } from './Logins/user/user.component';
import { AdminComponent } from './Logins/admin/admin.component';

import { AddmoviesComponent } from './Movies/addmovies/addmovies.component';
import { RegisterComponent } from './Logins/register/register.component';
import { PaymentComponent } from './Bookings/payment/payment.component';

import { AuthGuard } from './service/auth/auth.guard';




const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full',  },
  { path: 'login', component: LoginComponent,  },
  
  { path: 'admin', component: AdminComponent, canActivate : [AuthGuard]  },
  { path: 'user', component: UserComponent , canActivate : [AuthGuard] },
  { path: 'register', component: RegisterComponent,  },


  
  
  

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
