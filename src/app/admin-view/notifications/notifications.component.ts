import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { AdminCommService } from '../admin-comm.service'
import { Notification } from 'src/app/types/notification'
import { Group } from 'src/app/types/group'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { ToolbarService } from '../toolbar/toolbar.service'
import { ActivatedRoute, Router } from '@angular/router'
import { UserSearchResult } from 'src/app/commonComponents/user-search/user-search.component'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  standalone: false,
})
export class NotificationsComponent implements OnInit, OnDestroy {
  groups!: Group[]
  form = this.fb.group({
    recp: this.fb.group({
      uid: this.fb.control<UserSearchResult | null>(null),
      room: this.fb.control<string | null>(null),
      group: this.fb.control<string>(''),
      type: this.fb.control<'room' | 'uname' | 'group'>('uname', {
        nonNullable: true,
      }),
    }),
    title: this.fb.control('', { nonNullable: true }),
    body: this.fb.control('', { nonNullable: true }),
  })

  constructor(
    private readonly acs: AdminCommService,
    readonly ls: LocalStorageService,
    private toolbar: ToolbarService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.toolbar.comp = this
    this.toolbar.menu = [{ title: 'Wysłane', fn: 'outbox', icon: 'outbox' }]
  }

  outbox() {
    this.router.navigate(['outbox'], { relativeTo: this.route })
  }

  ngOnInit(): void {
    this.acs.notif.getGroups().subscribe(v => {
      this.groups = v
    })
  }

  ngOnDestroy(): void {
    this.toolbar.comp = undefined
    this.toolbar.menu = undefined
  }

  public inbox() {}

  success?: { sent: number; possible: number }

  submit() {
    this.acs.notif
      .send({
        ...this.form.value,
        recp: {
          ...this.form.get('recp')?.value,
          uid: this.form.controls['recp'].controls['uid'].value?._id,
        },
      } as Notification)
      .subscribe(data => {
        this.success = data
      })
  }
}
