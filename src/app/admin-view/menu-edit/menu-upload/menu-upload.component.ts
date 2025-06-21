import { Component, inject } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { MenuEditService } from '../menu-edit.service'

@Component({
  selector: 'app-upload-edit',
  templateUrl: './menu-upload.component.html',
  styleUrls: ['./menu-upload.component.scss'],
  standalone: false,
})
export class MenuUploadComponent {
  private ac = inject(MenuEditService)
  public dialogRef: MatDialogRef<MenuUploadComponent> = inject(MatDialogRef)

  protected file: File | undefined
  onFileChange(event: Event) {
    const file: File = (event.target as HTMLInputElement).files![0]
    if (file) {
      this.file = file
    } else {
      this.file = undefined
    }
  }

  submit() {
    this.ac.postMenu(this.file!)?.subscribe(value => {
      this.dialogRef.close(value)
    })
  }
}
