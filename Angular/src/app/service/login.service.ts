import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { logins } from '../models/logins.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
  
  loggedIn = false;

  logins: logins[] = [];
  login: logins = {
    login_id: 0,
    login_email: '',
    login_password: '',
    login_name: '',
    login_status: '',
    login_createdate: new Date()
  }
  baseUrl='https://localhost:44304/api/Login';
  
  constructor(private http: HttpClient) { }
 
 
  getallusers(logins: logins): Observable<logins[]>{
    return this.http.post<logins[]>('https://localhost:44304/api/Login/GetAllUser',logins);
  }
  
  Login(logins: logins): Observable<any> {  

   
    return this.http.post<logins>('https://localhost:44304/api/Login/validate', logins);
  }  
  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
    
  }
  
  
  getLoggedIn() {
    
    return this.loggedIn;
  }

  adduser(logins: logins): Observable<any>{
   debugger
   logins.login_id=0
   console.log(logins)
    return this.http.post<logins>('https://localhost:44304/api/Login/AddUser', logins);
  }

  getsingleuser(logins: logins): Observable<any>{
    return this.http.post<logins>('https://localhost:44304/api/Login/GetUsersById', logins);
  }


 

  updateuser(login_id:number): Observable<logins> {
 
   
    return this.http.post<logins>('https://localhost:44304/api/Login/update', login_id ); 
  }
  logout(login_id:number): Observable<logins>{
    
    return this.http.delete<logins>('https://localhost:44304/api/Login/'+login_id);
  }
}
