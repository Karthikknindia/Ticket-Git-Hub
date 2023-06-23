import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { InvalidpopupComponent } from '../invalidpopup/invalidpopup.component';


import { logins } from 'src/app/models/logins.model';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'angular';
  hide = true;
  logins: logins[] = [];
  login: logins = {
    login_id: 0,
    login_email: '',
    login_password: '',
    login_name: '',
    login_status: '',
    login_createdate: new Date("Fri Dec 08 2019 07:44:57")

  }

  errorMessage: string | undefined;
  loginForm: FormGroup = new FormGroup({});
  data: any;
  loginDetails: any;

  constructor(
    
    private router: Router,
   
    private loginService: LoginService,
    private fb: FormBuilder,
    private _dialog: MatDialog,
    public dialog: MatDialog,
    
  ) { }

  ngOnInit() {
    sessionStorage.clear();
    
    this.loginForm = this.fb.group({
      login_email: ['', Validators.required],
      login_password: ['', Validators.required]
    });
    
  }
 
 
  Login(row: any) {
    debugger
    console.log(this.login);
    debugger
    
    this.loginService.Login(this.login).subscribe(response => {
      console.log(response);

      if (response.status == "210") {
        debugger
        localStorage.setItem('isLoggedIn', 'true');
       
        const username = response.data.data.login_name;
        const userEmail=response.data.data.login_email;
        const loginid=response.data.data.login_id;
        const token=response.token.result.token
        const tokenid=response.token.result.token

        sessionStorage.setItem('tokenid', tokenid,);
        sessionStorage.setItem('token', token,);
        sessionStorage.setItem('username', username,);
        sessionStorage.setItem('userEmail', userEmail,);
        sessionStorage.setItem('loginid', loginid,);
        sessionStorage.setItem('role', 'admin');
        
        this.router.navigate(['/admin'])
        
      } else {
        
        if (response.status == "200") {
          debugger
          localStorage.setItem('isLoggedIn', 'true');
          const username = response.data.data.login_name;
          const userEmail=response.data.data.login_email;
          const loginid=response.data.data.login_id;
          const token=response.token.result.token;
          const tokenid=response.token.result.token;

          sessionStorage.setItem('tokenid', tokenid,);
          sessionStorage.setItem('token', token,);
          sessionStorage.setItem('role', 'user');


          sessionStorage.setItem('username', username,);
          sessionStorage.setItem('userEmail', userEmail,);
          sessionStorage.setItem('loginid', loginid,);
          this.router.navigate(['/user'])
        } else {

          this.dialog.open(InvalidpopupComponent);
        }
      }
    });
  }


  
  

  





}
