import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TheateraddedpopupComponent } from '../theateraddedpopup/theateraddedpopup.component';
import { TheaterlistComponent } from '../theaterlist/theaterlist.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { theaters } from 'src/app/models/theaters.model';
import { TheaterserviceService } from 'src/app/service/theaterservice.service';
import { AlredyexistComponent } from 'src/app/Logins/alredyexist/alredyexist.component';
@Component({
  selector: 'app-addtheator',
  templateUrl: './addtheator.component.html',
  styleUrls: ['./addtheator.component.css']
})
export class AddtheatorComponent {

  theaters: theaters[] = [];
  theater: theaters = {

    theater_id: 0,
    theater_name: '',
    theater_capacity: 0,
    theater_location: '',
    theater_screen: null,
    theater_status: '',
    theater_datetime: new Date(),
    theater_createdate: new Date(),
    theater_updatedate: new Date(),
    
  };
  selectedShowTiming: string;
  selectedShowTimingLabel:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _dialog: MatDialog, 
  private _snackBar: MatSnackBar, private theaterservice: TheaterserviceService, 
  public dialog: MatDialog, public dialogRef: MatDialogRef<TheateraddedpopupComponent>,) {
    this.selectedShowTiming = '';
    this.selectedShowTimingLabel='';

  }
 
  
  // @ViewChild(TheaterlistComponent) theaterlistcomponent: TheaterlistComponent;
  ngOnInit(): void {
    
    this.theater = this.data.row
    this.getalltheaters();
    
   
  
  }
  getalltheaters() {
    console.log(this.theater.theater_name)
    this.theaterservice.getalltheaters(this.theater)

      .subscribe(
        response => {
          this.theaters = response;

        }
      )
  }

  
  
  
  
  
  onSubmit() {
    
    if (this.theater.theater_id === 0) {
      this.theaterservice.adduser(this.theater)
        .subscribe(
          response => {


            if (response.status == "200") {
              this.dialogRef.close(AddtheatorComponent);
              this.dialog.open(TheateraddedpopupComponent)


            }
            else {
              this.dialog.open(AlredyexistComponent)
            }
          }
        );
    } else {
      
      this.theaterservice.updateTheater(this.theater)
        .subscribe(
          response => {

            console.log('Theater updated successfully');

            this.getalltheaters();
            this.dialogRef.close(AddtheatorComponent);
            this.openSnackBar('Updated successful.', 'OK');

          },
          error => {

            console.log('Error updating theater: ', error);
          }
        );
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}

