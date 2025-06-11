import { Component, Inject } from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog'
import { FormControl, FormGroup } from '@angular/forms'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { Group } from 'src/app/types/group'
import { AdminCommService } from '../../admin-comm.service'
import { UserDeleteComponent } from '../user-delete/user-delete.component'
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserResetComponent } from '../user-reset/user-reset.component'
import { catchError, throwError } from 'rxjs'
import { DateTime } from 'luxon'

export namespace UserEditComponent {
  export type InputData = { type: 'new' | 'edit'; id?: string; groups: Group[] }
  export type ReturnData = true | undefined
}

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
    groups: new FormControl<Array<string>>([]),
    flags: new FormControl<Array<number>>([]),
  })
  groups: Group[]
  id?: string
  regDate?: DateTime
  constructor(
    public dialogRef: MatDialogRef<UserEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserEditComponent.InputData,
    readonly ls: LocalStorageService,
    readonly acu: AdminCommService,
    private dialog: MatDialog,
    private sb: MatSnackBar
  ) {
    this.groups = data.groups
    if (data.type == 'edit') {
      this.id = data.id
      this.acu.accs.getUser(data.id!).subscribe(r => {
        this.regDate = DateTime.fromISO(r.regDate)
        var flags: Array<number> = []
        if (r.admin) {
          if ((r.admin & 1) == 1) flags.push(1)
          if ((r.admin & 2) == 2) flags.push(2)
          if ((r.admin & 4) == 4) flags.push(4)
          if ((r.admin & 8) == 8) flags.push(8)
          if ((r.admin & 16) == 16) flags.push(16)
          if ((r.admin & 32) == 32) flags.push(32)
          if ((r.admin & 64) == 64) flags.push(64)
          if ((r.admin & 128) == 128) flags.push(128)
        }
        this.locked = r.locked ? true : false
        this.lockout = r.lockout
        this.form.get('fname')?.setValue(r.fname)
        this.form.get('surname')?.setValue(r.surname)
        this.form.get('room')?.setValue(r.room)
        this.form.get('uname')?.setValue(r.uname)
        this.form.get('groups')?.setValue(r.groups)
        this.form.get('flags')?.setValue(flags)
      })
    }
  }

  protected submit() {
    this.loading = true
    if (this.data.type == 'edit') {
      this.acu.accs
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
      this.acu.accs
        .postAcc(this.getForm())
        .pipe(
          catchError(err => {
            this.sb.open('Wystąpił błąd. Skontaktuj się z obsługą programu.')
            return throwError(() => new Error(err.message))
          })
        )
        .subscribe(data => {
          if (data.status == 201) {
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
    this.acu.accs
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
      flags: (() => {
        var value = this.form
          .get('flags')
          ?.value.reduce((a: number, b: number) => a + b, 0)
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
          this.acu.accs.deleteAcc(this.id!).subscribe(res => {
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
          this.acu.accs.resetPass(this.id!).subscribe(patch => {
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
    this.acu.accs.putAcc(this.id!, { locked: state }).subscribe(res => {
      if (res.status == 200) {
        this.locked = state
      }
    })
  }
}
