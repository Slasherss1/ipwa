import { Component, inject, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder } from '@angular/forms'
import { Notification } from 'src/app/types/notification'
import { Group } from 'src/app/types/group'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { ToolbarService } from '../toolbar/toolbar.service'
import { ActivatedRoute, Router } from '@angular/router'
import { UserSearchResult } from 'src/app/commonComponents/user-search/user-search.component'
import { NotificationsService, SendResult } from './notifications.service'
import { AdminSyncService } from '../admin-sync.service'
import { catchError, throwError } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: false,
})
export class NotificationsComponent implements OnInit, OnDestroy {
  private ns = inject(NotificationsService)
  private as = inject(AdminSyncService)
  readonly ls = inject(LocalStorageService)
  private toolbar = inject(ToolbarService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  private sb = inject(MatSnackBar)

  groups!: Group[]
  form = this.fb.group({
    recp: this.fb.group({
      uid: this.fb.control<UserSearchResult | null>(null),
      room: this.fb.control<string | null>(null),
      group: this.fb.control<string>(''),
      type: this.fb.control<'room' | 'uid' | 'group'>('uid', {
        nonNullable: true,
      }),
    }),
    title: this.fb.control('', { nonNullable: true }),
    body: this.fb.control('', { nonNullable: true }),
  })

  constructor(
  ) {
    this.toolbar.comp = this
    this.toolbar.menu = [{ title: 'Wysłane', fn: 'outbox', icon: 'outbox' }]
  }

  outbox() {
    this.router.navigate(['outbox'], { relativeTo: this.route })
  }

  ngOnInit(): void {
    this.groups = this.as.groups
  }

  ngOnDestroy(): void {
    this.toolbar.comp = undefined
    this.toolbar.menu = undefined
  }

  success?: { sent: number; possible: number }

  submit() {
    this.ns
      .send({
        ...this.form.value,
        recp: {
          ...this.form.get('recp')?.value,
          uid: this.form.controls['recp'].controls['uid'].value?._id,
        },
      } as Notification)
      .pipe(
        catchError((err) => {
          if (err.status === 404) {
            this.sb.open("Brak odbiorców")
          }
          return throwError(() => err)
        })
      ).subscribe(data => {
        this.success = data as SendResult
      })
  }
}
