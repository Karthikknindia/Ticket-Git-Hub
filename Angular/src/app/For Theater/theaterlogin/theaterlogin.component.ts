import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { InvalidpopupComponent } from 'src/app/Logins/invalidpopup/invalidpopup.component';
import { logins } from 'src/app/models/logins.model';
import { LoginService } from 'src/app/service/login.service';



@Component({
  selector: 'app-theaterlogin',
  templateUrl: './theaterlogin.component.html',
  styleUrls: ['./theaterlogin.component.css']
})
export class TheaterloginComponent {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  logins: logins[] = [];
  login: logins = {
    login_id: 0,
    login_email: '',
    login_password: '',
    login_name: '',
    login_status: '',
    login_createdate: new Date("Fri Dec 08 2019 07:44:57")

  }





  loginForm: FormGroup = new FormGroup({});




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
      login_email: ['', [Validators.required, Validators.email, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      login_password: ['', Validators.required]
    });



  }

  Login(row: any) {
    debugger
    console.log(this.login);
    debugger

    this.loginService.Login(this.login).subscribe(response => {
      console.log(response);

      if (response.status == "200") {
        debugger
        localStorage.setItem('isLoggedIn', 'true');

        const username = response.data.data.login_name;
        const userEmail = response.data.data.login_email;
        const loginid = response.data.data.login_id;
        const token = response.token.result.token
        const tokenid = response.token.result.token

        sessionStorage.setItem('tokenid', tokenid,);
        sessionStorage.setItem('token', token,);
        sessionStorage.setItem('username', username,);
        sessionStorage.setItem('userEmail', userEmail,);
        sessionStorage.setItem('loginid', loginid,);
        sessionStorage.setItem('role', 'admin');

        this.router.navigate(['/theaterhome'])

      } else {

        this.dialog.open(InvalidpopupComponent);
      }
    });
}
    
}