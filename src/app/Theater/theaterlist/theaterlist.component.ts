import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { AddtheatorComponent } from '../addtheator/addtheator.component';
import { DeletetheaterComponent } from '../deletetheater/deletetheater.component';

import { SeatsComponent } from '../seats/seats.component';

import { ViewtheaterComponent } from '../viewtheater/viewtheater.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { theaters } from 'src/app/models/theaters.model';
import { TheaterserviceService } from 'src/app/service/theaterservice.service';
export interface PeriodicElement {
  
  name: string;
  position: number;
  action:string;
  sno?: number;
}


@Component({
  selector: 'app-theaterlist',
  templateUrl: './theaterlist.component.html',
  styleUrls: ['./theaterlist.component.css']
})
export class TheaterlistComponent implements OnInit  {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  

  title = 'Ticket';
  theaters:theaters[]=[];
  theater:theaters={

    theater_id:0,
    theater_name : '',
    theater_capacity:0,
    theater_location:'',
    theater_screen:null,
    theater_status:'',
    theater_datetime:new Date(),
    theater_createdate:new Date(),
    theater_updatedate:new Date(),
    
  }
  
  totalItems = 0;
  
  ngOnInit(): void{
    
    
    this.getalltheaters();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  
  displayedColumns: string[] = ['sno', 'theater_name','action'];
  dataSource = new MatTableDataSource<theaters>(this.theaters);
  


  constructor(private _dialog:MatDialog,private theaterservice:TheaterserviceService,public dialogRef: MatDialogRef<TheaterlistComponent> ){

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getalltheaters(){
    console.log(this.theater.theater_name)
    this.theaterservice.getalltheaters()
    
    .subscribe(
      response=>{
        this.theaters=response;
        this.dataSource.data = this.theaters;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      }
    )
  }

  updateTheater(row:any) {
   
    const dialogRef = this._dialog.open(AddtheatorComponent, {
      disableClose: true,
      data: { row }
    });
  }
 
 
  

      
  addtheater(){
    this._dialog.open(AddtheatorComponent,{
      disableClose: true,
    })
    this.dialogRef.close(TheaterlistComponent);
   
  }
 
  deletetheater(theater_id:number){
    
    this._dialog.open(DeletetheaterComponent)
    .afterClosed()
    .subscribe(
       (deletetheater: boolean) => {
          if (deletetheater) {
             this.theaterservice.deletetheater(theater_id)
             .subscribe(
                response=>{
                   this.getalltheaters();
                },
                error=>{
                   console.log(error); 
                },
                
             );
          } 
       }
    );
 }
 
  
  viewtheater(row: any) {
    
    const dialogRef = this._dialog.open(ViewtheaterComponent, {
      disableClose: true,
      data: { row }
    });
  }
  
  

  
}