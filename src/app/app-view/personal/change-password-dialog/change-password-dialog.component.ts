import { Component, inject } from '@angular/core'
import { AuthClient } from '../../../services/auth.client'
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { catchError, throwError } from 'rxjs'
import { MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { LocalStorageService } from 'src/app/services/local-storage.service'

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
  form: FormGroup
  constructor() {
    this.form = new FormGroup(
      {
        oldPass: new FormControl(),
        newPass: new FormControl(),
        newPassRepeat: new FormControl(),
      },
      { validators: [this.matchpass(), Validators.required] }
    )
  }

  private matchpass(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const newpass = control.get('newPass')
      const newpassrepeat = control.get('newPassRepeat')
      if (newpass?.value != newpassrepeat?.value) {
        const err = { noMatch: true }
        newpassrepeat?.setErrors(err)
        return err
      }
      newpassrepeat?.setErrors(null)
      return null
    }
  }

  protected changePass() {
    if (this.form.errors) {
      return
    }
    this.ac
      .chpass(this.form.get('oldPass')?.value, this.form.get('newPass')?.value)
      .pipe(
        catchError(err => {
          if (err.status == 401) {
            this.error = 'Niepoprawne dane'
            return throwError(() => new Error(err.message))
          }
          this.error = 'Nieznany błąd'
          return throwError(() => new Error(err.message))
        })
      )
      .subscribe(() => {
        if (this.error == null) {
          this.dr.close()
          this.ls.logOut()
          this.router.navigateByUrl('/login')
        }
      })
  }
}
