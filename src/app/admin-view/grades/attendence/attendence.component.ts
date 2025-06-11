import { Component, Inject, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { GradesService } from '../grades.service'

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrl: './attendence.component.scss',
  standalone: false,
})
export class AttendenceComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { room: string },
    public dialogRef: MatDialogRef<AttendenceComponent>,
    private ac: GradesService
  ) {}

  ngOnInit(): void {
    this.room = this.data.room
    this.ac.attendence.getUsers(this.room).subscribe(query => {
      query.users.forEach(v => {
        var att = query.attendence
          ? query.attendence.auto.find(z => z.id == v._id)
          : false
        this.users.push(
          this.fb.group({
            id: v._id,
            label: `${v.fname} ${v.surname}`,
            att: this.fb.control(att),
            hour: this.fb.control(att ? att.hour : ''),
          })
        )
      })
      this.form.get('notes')?.setValue(query.attendence?.notes)
    })
  }

  save() {
    this.dialogRef.close({
      room: this.room,
      ...this.form.value,
    })
  }

  room: string = ''

  form: FormGroup = this.fb.group({
    users: this.fb.array([]),
    notes: this.fb.control(''),
  })

  get users() {
    return this.form.get('users') as FormArray
  }
}
