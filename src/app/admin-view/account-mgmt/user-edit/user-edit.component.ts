import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  form: FormGroup
  constructor (public dialogRef: MatDialogRef<UserEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any, readonly ls: LocalStorageService) {
    if (data == null) {
      data = {
        fname: "",
        surname: "",
        room: 0,
        uname: "",
        admin: 0
      }
    }
    var flags: Array<number> = []
    if (data.admin) {
      if ((data.admin & 1) == 1) flags.push(1)
      if ((data.admin & 2) == 2) flags.push(2)
      if ((data.admin & 4) == 4) flags.push(4)
      if ((data.admin & 8) == 8) flags.push(8)
      if ((data.admin & 16) == 16) flags.push(16)
      if ((data.admin & 32) == 32) flags.push(32)
      if ((data.admin & 64) == 64) flags.push(64)
      if ((data.admin & 128) == 128) flags.push(128)
    }
    this.form = new FormGroup({
      fname: new FormControl(data.fname),
      surname: new FormControl(data.surname),
      room: new FormControl<number>(data.room),
      uname: new FormControl(data.uname),
      flags: new FormControl<Array<number>>(flags),
    })
  }

  protected editUser() {
    this.dialogRef.close({
      fname: this.form.get('fname')?.value,
      surname: this.form.get('surname')?.value,
      room: this.form.get('room')?.value,
      uname: this.form.get('uname')?.value,
      flags: (() => {
        var value = this.form.get('flags')?.value.reduce((a: number,b: number)=>a+b,0)
        if (this.ls.capCheck(32)) {
          return value
        } else {
          return undefined
        }
      })()
    })
  }
}
