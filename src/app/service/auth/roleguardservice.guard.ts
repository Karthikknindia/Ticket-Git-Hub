import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthserviceService } from './authservice.service';
import decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class RoleguardserviceGuard implements CanActivate {
  constructor(public auth: AuthserviceService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole: string = route.data['expectedRole'];
    const token: string | null = localStorage.getItem('token');
    // decode the token to get its payload
    const tokenPayload: any = token ? decode(token) : null;
    if (!this.auth.isAuthenticated() || (tokenPayload && tokenPayload.role !== expectedRole)) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
