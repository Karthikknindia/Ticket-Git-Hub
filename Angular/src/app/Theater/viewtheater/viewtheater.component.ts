import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { theaters } from 'src/app/models/theaters.model';
import { TheaterserviceService } from 'src/app/service/theaterservice.service';

@Component({
  selector: 'app-viewtheater',
  templateUrl: './viewtheater.component.html',
  styleUrls: ['./viewtheater.component.css']
})
export class ViewtheaterComponent {
  
  theater!: theaters;
  
  
  
  
  constructor(  @Inject(MAT_DIALOG_DATA) public data: any,private route: ActivatedRoute, private theaterservice: TheaterserviceService) {
   
 this.theater=data.row
  }

 
}


