import { Injectable } from '@angular/core';


import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(public jwtHelper: JwtHelperService) { }

 isAuthenticated(): boolean {
  debugger
    const token = localStorage.getItem('token');
  
    return !this.jwtHelper.isTokenExpired(token);
  }
}
