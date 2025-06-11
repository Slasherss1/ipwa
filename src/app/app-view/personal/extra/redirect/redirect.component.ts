import { Component } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { AuthClient } from 'src/app/services/auth.client'

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss',
  standalone: false,
})
export class RedirectComponent {
  protected redirect = ''
  constructor(
    public dialogRef: MatDialogRef<RedirectComponent>,
    private ac: AuthClient
  ) {
    this.redirect = ac.redirect
  }

  protected save() {
    this.ac.redirect = this.redirect
    this.dialogRef.close()
  }
}
