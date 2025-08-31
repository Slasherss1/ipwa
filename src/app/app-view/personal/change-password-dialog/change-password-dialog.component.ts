import { Component, inject } from '@angular/core'
import { AuthClient } from '../../../services/auth.client'
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { catchError, throwError } from 'rxjs'
import { MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { PasswordValidators } from './pwd.validators'

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss'],
  standalone: false,
})
export class ChangePasswordDialogComponent {
  private ac = inject(AuthClient)
  public dr: MatDialogRef<ChangePasswordDialogComponent> = inject(MatDialogRef)
  private router = inject(Router)
  private ls = inject(LocalStorageService)

  error: string | null = null
  form = new FormGroup(
    {
      oldPass: new FormControl("", { validators: Validators.required, nonNullable: true }),
      newPass: new FormControl("", { validators: Validators.required, nonNullable: true }),
      newPassRepeat: new FormControl("", { validators: Validators.required, nonNullable: true }),
    },
    { validators: [PasswordValidators.matchPass, PasswordValidators.childrenRequired] }
  )

  changePass() {
    this.form.markAllAsTouched()

    if (this.form.errors) {
      throw new Error("Form invalid")
    } else {
      this.error = null
    }

    this.ac
      .chpass(this.form.controls['oldPass'].value, this.form.controls['newPass'].value)
      .pipe(
        catchError(err => {
          if (err.status == 401) {
            this.form.controls['oldPass'].setErrors({
              wrongPass: true
            })
            return throwError(() => new Error(err.message))
          }
          this.error = 'Nieznany błąd'
          return throwError(() => new Error(err.message))
        })
      )
      .subscribe(() => {
        if (this.error == null) {
          this.dr.close()
          this.ac.logout()
        }
      })
  }
}
