import { Component } from '@angular/core';
import { AdminCommService } from '../../admin-comm.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-edit',
  templateUrl: './menu-upload.component.html',
  styleUrls: ['./menu-upload.component.scss'],
})
export class MenuUploadComponent {
  constructor(private ac:AdminCommService, public dialogRef: MatDialogRef<MenuUploadComponent>) {}
  protected file: File | undefined;
  onFileChange(event: Event) {
    const file:File = (event.target as HTMLInputElement).files![0];
    if (file) {
      this.file = file
    } else {
      this.file = undefined
    }
  }
  
  submit() {
    this.ac.menu.postMenu(this.file!)?.subscribe((value) => {
      this.dialogRef.close(value)
    })
  }
}
