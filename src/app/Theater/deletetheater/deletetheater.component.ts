import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletetheater',
  templateUrl: './deletetheater.component.html',
  styleUrls: ['./deletetheater.component.css']
})
export class DeletetheaterComponent {
constructor(private dialogRef: MatDialogRef<DeletetheaterComponent>){}

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

 
  delete() {
    const deletetheater= true;
    this.dialogRef.close(deletetheater);
  }
}
