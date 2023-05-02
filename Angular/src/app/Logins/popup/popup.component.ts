import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  constructor(private Loginservice: LoginService, private router: Router, private _dialog: MatDialog, public dialog: MatDialog){}
onSubmit(){
  
  this.router.navigate(['/user'])
}
  
}
