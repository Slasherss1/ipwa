import { Component, inject } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { AuthClient } from 'src/app/services/auth.client'

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss',
  standalone: false,
})
export class RedirectComponent {
  public dialogRef: MatDialogRef<RedirectComponent> = inject(MatDialogRef)
  private ac = inject(AuthClient)

  protected redirect = ''
  constructor() {
    this.redirect = this.ac.redirect
  }

  protected save() {
    this.ac.redirect = this.redirect
    this.dialogRef.close()
  }
}
