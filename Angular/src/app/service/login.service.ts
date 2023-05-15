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

  baseUrl='https://localhost:44304/api/Login';
  
  constructor(private http: HttpClient) { }
  
 
  getallusers(logins: logins): Observable<logins[]>{
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.post<logins[]>('https://localhost:44304/api/Login/GetAllUser',logins,httpOptions);
  }
  
  Login(logins: logins): Observable<any> {  
    
   
    return this.http.post<logins>('https://localhost:44304/api/Login/Authenticate', logins);
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
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
   logins.login_id=0
   console.log(logins)
    return this.http.post<logins>('https://localhost:44304/api/Login/AddUser', logins,httpOptions);
  }

  getsingleuser(logins: logins): Observable<any>{
    return this.http.post<logins>('https://localhost:44304/api/Login/GetUsersById', logins);
  }


 

  updateuser(login_id:number): Observable<logins> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
   
    return this.http.post<logins>('https://localhost:44304/api/Login/update', login_id,httpOptions ); 
  }
  logout(login_id:number): Observable<logins>{
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
    return this.http.delete<logins>('https://localhost:44304/api/Login/'+login_id,httpOptions);
  }
  token(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  
    return this.http.post<any>(`https://localhost:44304/api/Login/Expired?token=${token}`, null, httpOptions);
  }
  
  
}
