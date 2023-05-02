import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletemovie',
  templateUrl: './deletemovie.component.html',
  styleUrls: ['./deletemovie.component.css']
})
export class DeletemovieComponent  implements OnInit{
  constructor(private dialogRef: MatDialogRef<DeletemovieComponent>){}

  ngOnInit(): void {
    
  }
  close() {
    this.dialogRef.close();
  }
  delete() {
    const deletemovie= true;
    this.dialogRef.close(deletemovie);
  }
}
