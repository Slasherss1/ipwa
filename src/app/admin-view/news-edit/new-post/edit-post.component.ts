import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class NewPostComponent {
  form: FormGroup;
  constructor (public dialogRef: MatDialogRef<NewPostComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data == null) {
      data = {
        title:"",
        content:"",
      }
    }
    this.form = new FormGroup({
      title: new FormControl(data.title),
      content: new FormControl(data.content)
    })
  }

  protected makePost() {
    this.dialogRef.close({
      title: this.form.get('title')?.value,
      content: this.form.get('content')?.value
    })
  }
}
