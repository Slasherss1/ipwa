import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminCommService } from '../admin-comm.service';
import * as moment from 'moment';
import { FormArray, FormBuilder } from '@angular/forms';
import { weekendFilter } from 'src/app/fd.da';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToolbarService } from '../toolbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AttendenceComponent } from './attendence/attendence.component';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrl: './grades.component.scss'
})
export class GradesComponent implements OnInit, OnDestroy {
  rooms!: string[]
  room: string = "0";
  date: moment.Moment;
  grade: number = 6
  gradeDate?: moment.Moment;
  id?: string
  filter = weekendFilter

  get notes(): { label: string, weight: number }[] {
    var th = this.things.value as { cb: boolean, label: string, weight: number }[]
    return th.filter((v) => v.cb).map((v) => {
      return { ...v, cb: undefined }
    })
  }

  set notes(value: { label: string, weight: number }[]) {
    var things = this.things.controls
    things.forEach((v) => {
      var thing = value.find((s) => s.label == v.get('label')?.value)
      if (thing) {
        v.get('cb')?.setValue(true)
        v.get('weight')?.setValue(thing.weight)
      } else {
        v.get('cb')?.setValue(false)
        v.get('weight')?.setValue(1)
      }
    })
  }

  constructor(private ac: AdminCommService, private fb: FormBuilder, private sb: MatSnackBar, private toolbar: ToolbarService, private router: Router, private route: ActivatedRoute, private dialog: MatDialog) {
    this.date = moment.utc().startOf('day')
    if (!this.filter(this.date)) this.date.isoWeekday(8);
    this.toolbar.comp = this
    this.toolbar.menu = [
      { title: "Podsumowanie", check: true, fn: "summary", icon: "analytics" },
      { title: "Obecność", check: true, fn: "attendenceSummary", icon: "overview"}
    ]
    this.form.valueChanges.subscribe((v) => {
      this.calculate()
    })
  }

  form = this.fb.group({
    things: this.fb.array([]),
    tips: this.fb.control("")
  })

  get things() {
    return this.form.get('things') as FormArray
  }

  summary() {
    this.router.navigate(["summary"], { relativeTo: this.route })
  }

  attendenceSummary() {
    this.router.navigate(["attendenceSummary"], {relativeTo: this.route})
  }

  ngOnInit(): void {
    this.ac.clean.getConfig().subscribe((s) => {
      this.rooms = s.rooms
      s.things.forEach((s) => this.things.push(this.fb.group({
        cb: this.fb.control(false),
        label: this.fb.control(s),
        weight: this.fb.control(1)
      })))
    })
  }

  ngOnDestroy(): void {
    this.toolbar.comp = undefined
    this.toolbar.menu = undefined
  }

  downloadData() {
    this.ac.clean.getClean(this.date, this.room).subscribe((v) => {
      if (v) {
        this.notes = v.notes
        this.gradeDate = moment(v.gradeDate)
        this.grade = v.grade
        this.id = v._id
        this.form.get("tips")?.setValue(v.tips)
      } else {
        this.gradeDate = undefined
        this.grade = 6
        this.notes = []
        this.id = undefined
        this.form.get("tips")?.setValue("")
      }
    })
  }

  calculate() {
    this.grade = 6
    this.things.controls.forEach(s => {
      if (s.get('cb')?.value) this.grade -= 1 * s.get('weight')?.value
      if (this.grade < 0) this.grade = 0
    })
  }

  group = {
    add: (index: number) => {
      var weight = this.things.at(index).get('weight')!
      weight.setValue(weight.value + 1)
    },
    sub: (index: number) => {
      var weight = this.things.at(index).get('weight')!
      if (weight.value < 1) {
        weight.setValue(1)
      } else {
        if (weight.value - 1 < 1) {
          weight.setValue(1)
        } else {
          weight.setValue(weight.value - 1)
        }
      }
    }
  }

  save() {
    this.calculate()
    var obj = {
      grade: this.grade,
      date: this.date.toDate(),
      room: this.room,
      notes: this.notes,
      tips: this.form.get("tips")?.value
    }
    this.ac.clean.postClean(obj).subscribe((s) => {
      this.sb.open("Zapisano!", undefined, { duration: 1500 })
      this.downloadData()
    })
  }

  remove() {
    this.ac.clean.delete(this.id!).subscribe((s) => {
      if (s.status == 200) {
        this.downloadData()
      }
    })
  }

  roomNumber(value: string) {
    this.room = value
    this.downloadData()
  }

  attendence() {
    this.dialog.open(AttendenceComponent, {data: {room: this.room}}).afterClosed().subscribe((v: {room: string, users: {att: boolean, id: string, hour: string}[], notes: string}) => {
      if (!v) return
      let x: {room: string, users: {id: string, hour?: string}[]} = {
        room: v.room,
        users: []
      }
      v.users.forEach(i => {
        if (i.att && i.hour) {
          x.users.push({id: i.id, hour: i.hour})
        }
      })
      this.ac.clean.attendence.postAttendence(x.room, {auto: x.users, notes: v.notes}).subscribe((s) => {
        if (s.status == 200) {
          this.sb.open("Zapisano obecność!", undefined, {duration: 1500})
        }
      })
    })
  }
}
