import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminCommService } from '../admin-comm.service';
import { Notification } from 'src/app/types/notification';
import { Group } from 'src/app/types/group';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ToolbarService } from '../toolbar/toolbar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSearchResult } from 'src/app/commonComponents/user-search/user-search.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  groups!: Group[]

  constructor (private readonly acs: AdminCommService, readonly ls: LocalStorageService, private toolbar: ToolbarService, private router: Router, private route: ActivatedRoute ) {
    this.toolbar.comp = this
    this.toolbar.menu = [
      { title: "Wysłane", fn: "outbox", icon: "outbox" }
    ]
  }
  
  outbox() {
    this.router.navigate(["outbox"], { relativeTo: this.route })
  }

  ngOnInit(): void {
    this.acs.notif.getGroups().subscribe((v) => {
      this.groups = v
    })
  }

  ngOnDestroy(): void {
    this.toolbar.comp = undefined
    this.toolbar.menu = undefined
  }

  public inbox() {
    
  }

  success?: { sent: number; possible: number; };

  form = new FormGroup({
    recp: new FormGroup({
      uid: new FormControl<UserSearchResult | null>(null),
      room: new FormControl<string|null>(null),
      group: new FormControl<string>(''),
      type: new FormControl<"room" | "uname" | "group">('uname', {nonNullable: true})
    }),
    title: new FormControl('', {nonNullable: true}),
    body: new FormControl('', {nonNullable: true})
  })

  submit() {
    this.acs.notif.send({...this.form.value, recp: {...this.form.get("recp")?.value, uid: this.form.controls['recp'].controls['uid'].value?._id}} as Notification).subscribe((data) => {
      this.success = data
    })
  }
}
