import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { TheaterlistComponent } from '../theaterlist/theaterlist.component';

@Component({
  selector: 'app-theateraddedpopup',
  templateUrl: './theateraddedpopup.component.html',
  styleUrls: ['./theateraddedpopup.component.css']
})
export class TheateraddedpopupComponent {

  constructor( private router: Router, private _dialog: MatDialog, public dialog: MatDialog,public dialogRef: MatDialogRef<TheaterlistComponent>) {}
onSubmit(){
  this.dialog.open(TheaterlistComponent)
}
}
