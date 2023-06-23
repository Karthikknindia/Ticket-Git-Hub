import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { logins } from '../models/logins.model';
import { tokens } from '../models/tokens.model';

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
  tokens:tokens[]=[];
  tok:tokens={
    token_id: 0,
    token: ''
  }

  baseUrl='https://192.168.1.186';
  
  constructor(private http: HttpClient) { }
  
 
  getallusers(logins: logins): Observable<logins[]>{
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Login/GetAllUser';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<logins[]>(url, logins, httpOptions);
  }
  
  Login(logins: logins): Observable<any> {  
    const endpoint = '/api/Login/Authenticate';
    const url = this.baseUrl + endpoint;
   
    return this.http.post<logins>(url, logins);
  }  
  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') === 'true';
    // return sessionStorage.getItem('token') === 'true';
   
  }
  
  
  getLoggedIn() {
    
    return this.loggedIn;
  }

  adduser(logins: logins): Observable<any>{
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Login/AddUser';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
   logins.login_id=0
   console.log(logins)
    return this.http.post<logins>(url, logins,httpOptions);
  }

  getsingleuser(logins: logins): Observable<any>{
    const endpoint = '/api/Login/AddUser';
    const url = this.baseUrl + endpoint;
    return this.http.post<logins>(url, logins);
  }


 

  updateuser(login_id:number): Observable<logins> {
    const token = sessionStorage.getItem('token');
    const endpoint = '/api/Login/update';
    const url = this.baseUrl + endpoint;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
   
    return this.http.post<logins>(url, login_id,httpOptions ); 
  }
  logout(login_id:number): Observable<logins>{
    debugger
    const endpoint = '/api/Login/logout';
    const url = this.baseUrl + endpoint;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<logins>(url,login_id,httpOptions);
  }
  token(): Observable<any> {
    const endpoint = '/api/Login/token';
    const url = this.baseUrl + endpoint;
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    const expiredUrl = `${this.baseUrl}/api/Login/Expired?token=${token}`;
  
    return this.http.post<any>(expiredUrl, null, httpOptions);
  }
  
  
}
