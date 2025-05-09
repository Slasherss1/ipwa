import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminCommService } from '../admin-comm.service';
import { Notification } from 'src/app/types/notification';
import { Group } from 'src/app/types/group';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  groups!: Group[]

  constructor (private readonly acs: AdminCommService, readonly ls: LocalStorageService) { }

  ngOnInit(): void {
    this.acs.notif.getGroups().subscribe((v) => {
      this.groups = v
    })
  }

  success?: { sent: number; possible: number; };

  form = new FormGroup<NotificationForm>({
    recp: new FormGroup({
      uname: new FormControl<string>(''),
      room: new FormControl<string|null>(null),
      group: new FormControl<string>(''),
      type: new FormControl<"room" | "uname" | "group">('uname', {nonNullable: true})
    }),
    title: new FormControl('', {nonNullable: true}),
    body: new FormControl('', {nonNullable: true})
  })

  submit() {
    this.acs.notif.send(this.form.value as Notification).subscribe((data) => {
      this.success = data
    })
  }
}

interface NotificationForm {
  body: FormControl<string>;
  title: FormControl<string>;
  recp: FormGroup<{
      uname: FormControl<string | null>;
      room: FormControl<string | null>;
      group: FormControl<string | null>;
      type: FormControl<"room" | "uname" | "group">;
  }>
}