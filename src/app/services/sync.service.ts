import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { repeat, retry, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { UpdatesService } from './updates.service';
import { NotifDialogComponent } from '../app-view/notif-dialog/notif-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  template: "<mat-icon>cloud_off</mat-icon> <span>Tryb offline</span>",
  styles: ":host {display: flex; gap: 1ch}",
  imports: [MatIconModule]
})
class OfflineMessageBar {}

@Injectable({
  providedIn: 'root'
})
export class SyncService {
  private http = inject(HttpClient)
  private dialog = inject(MatDialog)
  private ls = inject(LocalStorageService)
  private us = inject(UpdatesService)
  private sb = inject(MatSnackBar)

  constructor() { }

  subscribe() {
    this.http.get<any>(environment.apiEndpoint + "/sync", { withCredentials: true }).pipe(repeat()).subscribe({
      next: v => {
        switch (v.type) {
          case "news":
            this.newsEvents.next(v.operation)
            break;
          case "notif":
            this.notifEvents.next()
            break;
          default:
            break;
        }
      },
      error: v => {
        this.sb.openFromComponent(OfflineMessageBar, {duration: 2000})
      }
    })
  }

  public newsEvents = new Subject<any>()
  public notifEvents = new Subject<void>()

  notifCheck() {
    if (this.ls.capCheck(4)) {
      this.us.getNotifCheck().subscribe(s => {
        s.forEach(v => {
          this.dialog.open(NotifDialogComponent, { data: v })
        })
      })
    }
  }

}
