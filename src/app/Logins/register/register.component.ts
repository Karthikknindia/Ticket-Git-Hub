import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlredyexistComponent } from '../alredyexist/alredyexist.component';
import { InvalidpopupComponent } from '../invalidpopup/invalidpopup.component';

import { PopupComponent } from '../popup/popup.component';
import { logins } from 'src/app/models/logins.model';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  myimage: string = "assets/images/leo-fan-made-poster.png"


  logins: logins[] = [];
  login: logins = {
    login_id: 0,
    login_email: '',
    login_password: '',
    login_name: '',
    login_status: '',
    login_createdate: new Date("Fri Dec 08 2019 07:44:57")
  }






  constructor(private Loginservice: LoginService, private router: Router, private _dialog: MatDialog, public dialog: MatDialog) {

  }
  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email
  // ]);
  // myForm = new FormGroup({
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.email
  //   ])
  // });
  ngOnInit(): void {
    this.getallusers();
  
  }

  getallusers() {

    this.Loginservice.getallusers(this.login)
      .subscribe(
        response => {
          this.logins = response;
          this.login = {
            login_id: 0,
            login_email: '',
            login_password: '',
            login_name: '',
            login_status: '',
            login_createdate: new Date()


          }
        }
      )
  }
  // gotopage(){
  //   this._dialog.open(PopupComponent);
  // }
  // openDialog() {
  //   this.dialog.open(PopupComponent);
  // }

  onSubmit() {
    debugger
    this.Loginservice.adduser(this.login)
      .subscribe(
        
        response => {

          if (response.status=="200") {
            debugger
            this.Loginservice.getallusers(this.login)
            localStorage.setItem('isLoggedIn', 'true');
          
            console.log(response)
            debugger
            const username = response.data.retrievedLogin.login_name;
            const userEmail=response.data.retrievedLogin.login_email;
            const loginid=response.data.retrievedLogin.login_id;
    
            sessionStorage.setItem('loginid', loginid,);
            sessionStorage.setItem('username', username,);
            sessionStorage.setItem('userEmail', userEmail,);
            
            this.dialog.open(PopupComponent)
            this.router.navigate(['/user'])
            

          }
          else {
            this.dialog.open(AlredyexistComponent)
          }
        }
      );
  };




// deleteuser(id:string){
//   this.Loginservice.deleteuser(id)
//   .subscribe(
//     response=>{
//       this.getallusers();
//     }
//   );
// }

populateForm(login: logins){
  this.login = login;
}




  // updateuser(login:logins){
  //   this.Loginservice.updateuser(login)
  //   .subscribe(
  //     response=>{
  //       this.getallusers();
  //     }
  //   );
  // }
}
