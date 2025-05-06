import { Component, OnInit } from '@angular/core';
import { AdminCommService } from '../admin-comm.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  usettings!: IUSettings
  reloadTimeout: boolean = false;

  constructor (private readonly acu: AdminCommService, private readonly sb: MatSnackBar) { }
  ngOnInit(): void {
    this.acu.settings.getAll().subscribe((r) => {
      this.usettings = r
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

  send() {
    this.acu.settings.post(this.usettings).subscribe((s) => {
      if (s.status == 200) {
        this.sb.open("Zapisano!", undefined, {duration: 1000})
      } else {
        console.error(s);
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
    }, 5000);
    this.acu.settings.reload().subscribe((s) => {
      if (s.status == 200) {
        this.sb.open("Przeładowano ustawienia!", undefined, {duration: 3000})
      } else {
        console.error(s);
      }
    })
  }
}

export interface IUSettings {
  keyrooms: string[];
  rooms: string[];
  cleanThings: string[];
}