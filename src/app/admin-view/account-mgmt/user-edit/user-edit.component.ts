import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Group } from 'src/app/types/group';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent {
  form: FormGroup
  groups: Group[]
  constructor (public dialogRef: MatDialogRef<UserEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any, readonly ls: LocalStorageService) {
    if (data.user == null) {
      data.user = {
        fname: "",
        surname: "",
        room: "",
        uname: "",
        groups: [],
        admin: 0
      }
    }
    this.groups = data.groups ? data.groups : []
    var flags: Array<number> = []
    if (data.user.admin) {
      if ((data.user.admin & 1) == 1) flags.push(1)
      if ((data.user.admin & 2) == 2) flags.push(2)
      if ((data.user.admin & 4) == 4) flags.push(4)
      if ((data.user.admin & 8) == 8) flags.push(8)
      if ((data.user.admin & 16) == 16) flags.push(16)
      if ((data.user.admin & 32) == 32) flags.push(32)
      if ((data.user.admin & 64) == 64) flags.push(64)
      if ((data.user.admin & 128) == 128) flags.push(128)
    }
    this.form = new FormGroup({
      fname: new FormControl(data.user.fname),
      surname: new FormControl(data.user.surname),
      room: new FormControl(data.user.room),
      uname: new FormControl<string>(data.user.uname),
      groups: new FormControl<Array<string>>(data.user.groups),
      flags: new FormControl<Array<number>>(flags),
    })
  }

  protected editUser() {    
    this.dialogRef.close({
      fname: this.form.get('fname')?.value,
      surname: this.form.get('surname')?.value,
      room: this.form.get('room')?.value,
      uname: this.form.get('uname')?.value,
      groups: this.form.get('groups')?.value,
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
