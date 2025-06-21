import { Component, inject, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FormBuilder } from '@angular/forms'
import { SettingsService } from './settings.service'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  standalone: false,
})
export class SettingsComponent implements OnInit {
  private acu = inject(SettingsService)
  private sb = inject(MatSnackBar)
  private fb = inject(FormBuilder)

  usettings: IUSettings = {
    cleanThings: [],
    keyrooms: [],
    menu: { defaultItems: { kol: [], sn: [] } },
    rooms: [],
    security: { loginTimeout: { attempts: 0, lockout: 0, time: 0 } },
  }
  reloadTimeout = false

  accSec = this.fb.nonNullable.group({
    attempts: this.fb.nonNullable.control(1),
    time: this.fb.nonNullable.control(1),
    lockout: this.fb.nonNullable.control(1),
  })

  ngOnInit(): void {
    this.acu.getAll().subscribe(r => {
      this.usettings = r
      this.accSecTimeouts = r.security.loginTimeout
    })
  }

  saveRoom(event: string[]) {
    this.usettings.rooms = event
    this.send()
  }

  saveCleanThings(event: string[]) {
    this.usettings.cleanThings = event
    this.send()
  }

  saveKeyrooms(event: string[]) {
    this.usettings.keyrooms = event
    this.send()
  }

  saveSn(event: string[]) {
    this.usettings.menu.defaultItems.sn = event
    this.send()
  }

  saveKol(event: string[]) {
    this.usettings.menu.defaultItems.kol = event
    this.send()
  }

  saveAccSecTimeouts() {
    this.usettings.security.loginTimeout = this.accSecTimeouts
    this.send()
  }

  set accSecTimeouts(value: IUSettings['security']['loginTimeout']) {
    this.accSec.setValue({
      attempts: value.attempts,
      lockout: value.lockout / 60,
      time: value.time / 60,
    })
  }
  get accSecTimeouts(): IUSettings['security']['loginTimeout'] {
    return {
      attempts: this.accSec.controls['attempts'].value,
      lockout: this.accSec.controls['lockout'].value * 60,
      time: this.accSec.controls['time'].value * 60,
    }
  }

  send() {
    this.acu.post(this.usettings).subscribe(s => {
      if (s.status == 200) {
        this.sb.open('Zapisano!', undefined, { duration: 1000 })
      } else {
        console.error(s)
      }
    })
  }

  reloadSettings() {
    if (this.reloadTimeout) {
      return
    }
    this.reloadTimeout = true
    setTimeout(() => {
      this.reloadTimeout = false
    }, 5000)
    this.acu.reload().subscribe(s => {
      if (s.status == 200) {
        this.sb.open('Przeładowano ustawienia!', undefined, { duration: 3000 })
      } else {
        console.error(s)
      }
    })
  }
}

export interface IUSettings {
  keyrooms: string[]
  rooms: string[]
  cleanThings: string[]
  menu: {
    defaultItems: {
      sn: string[]
      kol: string[]
    }
  }
  security: {
    loginTimeout: {
      attempts: number
      time: number
      lockout: number
    }
  }
}
