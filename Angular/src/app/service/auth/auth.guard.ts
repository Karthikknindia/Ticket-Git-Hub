import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthserviceService } from './authservice.service';
import { LoginService } from '../login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public loginservice: LoginService, public router: Router) {}
  canActivate(): boolean {
    
    if (!this.loginservice.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
  
}
