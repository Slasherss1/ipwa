import { Component, inject } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog'
import { FormControl, FormGroup } from '@angular/forms'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { Group } from 'src/app/types/group'
import { UserDeleteComponent } from '../user-delete/user-delete.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserResetComponent } from '../user-reset/user-reset.component'
import { catchError, throwError } from 'rxjs'
import { DateTime } from 'luxon'
import { AccountMgmtService } from '../account-mgmt.service'
import { AdminSyncService } from '../../admin-sync.service'

export interface UserEditComponentInputData { type: 'new' | 'edit'; id?: string; groups: Group[] }
export type UserEditComponentReturnData = true | undefined

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  standalone: false,
})
export class UserEditComponent {
  lockout = false
  locked = false
  loading = false
  form: FormGroup = new FormGroup({
    fname: new FormControl<string>(''),
    surname: new FormControl<string>(''),
    room: new FormControl<string>(''),
    uname: new FormControl<string>(''),
    groups: new FormControl<string[]>([]),
    flags: new FormControl<string[]>([]),
  })
  id?: string
  regDate?: DateTime

  public dialogRef: MatDialogRef<UserEditComponent> = inject(MatDialogRef)
  public data: UserEditComponentInputData = inject(MAT_DIALOG_DATA)
  protected ls = inject(LocalStorageService)
  private acu = inject(AccountMgmtService)
  private dialog = inject(MatDialog)
  private sb = inject(MatSnackBar)
  protected adsyn = inject(AdminSyncService)

  constructor() {
    if (this.data.type == 'edit') {
      this.id = this.data.id
      this.acu.getUser(this.data.id!).subscribe(r => {
        this.regDate = DateTime.fromISO(r.regDate)
        this.locked = r.locked ? true : false
        this.lockout = r.lockout
        this.form.get('fname')?.setValue(r.fname)
        this.form.get('surname')?.setValue(r.surname)
        this.form.get('room')?.setValue(r.room)
        this.form.get('uname')?.setValue(r.uname)
        this.form.get('groups')?.setValue(r.groups)
        this.form.get('flags')?.setValue(r.admin)
      })
    }
  }

  protected submit() {
    this.loading = true
    if (this.data.type == 'edit') {
      this.acu
        .putAcc(this.id!, this.getForm())
        .pipe(
          catchError(err => {
            this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
            return throwError(() => new Error(err.message))
          })
        )
        .subscribe(data => {
          if (data.status == 200) {
            this.sb.open('Użytkownik został zmodyfikowany.', undefined, {
              duration: 2500,
            })
            this.dialogRef.close(true)
          } else {
            this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
            this.loading = false
          }
        })
    } else {
      this.acu
        .postAcc(this.getForm())
        .pipe(
          catchError(err => {
            this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
            return throwError(() => new Error(err.message))
          })
        )
        .subscribe(data => {
          if (data) {
            this.sb.open('Użytkownik został utworzony.', undefined, {
              duration: 2500,
            })
            this.dialogRef.close(true)
          } else {
            this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
            this.loading = false
          }
        })
    }
  }

  protected disableLockout() {
    this.loading = true
    this.acu
      .clearLockout(this.id!)
      .pipe(
        catchError(err => {
          this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
          return throwError(() => new Error(err.message))
        })
      )
      .subscribe(s => {
        if (s.status == 200) {
          this.loading = false
          this.lockout = false
        } else {
          this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
          this.loading = false
        }
      })
  }

  protected getForm() {
    return {
      fname: this.form.get('fname')?.value,
      surname: this.form.get('surname')?.value,
      room: this.form.get('room')?.value,
      uname: this.form.get('uname')?.value,
      groups: this.form.get('groups')?.value,
      admin: (() => {
        const value = this.form.get('flags')?.value
        if (this.ls.capCheck(32)) {
          return value
        } else {
          return undefined
        }
      })(),
    }
  }

  protected delete() {
    this.dialog
      .open(UserDeleteComponent)
      .afterClosed()
      .subscribe(reply => {
        if (reply) {
          this.acu.deleteAcc(this.id!).subscribe(res => {
            if (res.status == 200) {
              this.sb.open('Użytkownik został usunięty.', undefined, {
                duration: 2500,
              })
              this.dialogRef.close()
            } else {
              this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
              console.error(res)
            }
          })
        }
      })
  }

  protected resetPass() {
    this.loading = true
    this.dialog
      .open(UserResetComponent)
      .afterClosed()
      .subscribe(res => {
        if (res == true) {
          this.acu.resetPass(this.id!).subscribe(patch => {
            if (patch.status == 200) {
              this.sb.open('Hasło zostało zresetowane', undefined, {
                duration: 2500,
              })
              this.loading = false
            }
          })
        }
      })
  }

  protected toggleLock(state: boolean) {
    this.acu.putAcc(this.id!, { locked: state }).subscribe(res => {
      if (res.status == 200) {
        this.locked = state
      }
    })
  }
}
