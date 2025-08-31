import { Component, inject } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { News } from 'src/app/types/news.model'

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
  standalone: false,
})
export class NewPostComponent {
  public dialogRef: MatDialogRef<NewPostComponent> = inject(MatDialogRef)
  public data: Partial<News> = inject(MAT_DIALOG_DATA)
  form: FormGroup
  constructor() {
    if (this.data == null) {
      this.data = {
        title: '',
        content: '',
      }
    }
    this.form = new FormGroup({
      title: new FormControl(this.data.title),
      content: new FormControl(this.data.content),
    })
  }

  protected makePost() {
    this.dialogRef.close({
      title: this.form.get('title')?.value,
      content: this.form.get('content')?.value,
    })
  }
}
