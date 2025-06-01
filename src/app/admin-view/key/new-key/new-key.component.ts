import { Component, OnInit } from '@angular/core';
import { AdminCommService } from '../../admin-comm.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { UserSearchResult } from 'src/app/commonComponents/user-search/user-search.component';

@Component({
  selector: 'app-new-key',
  templateUrl: './new-key.component.html',
  styleUrl: './new-key.component.scss'
})
export class NewKeyComponent implements OnInit {
  rooms: string[] = []
  form = new FormGroup({
    room: new FormControl<string>(""),
    user: new FormControl<UserSearchResult | null>(null)
  })
  unames: any[] = []
  constructor ( private ac: AdminCommService, public dialogRef: MatDialogRef<NewKeyComponent> ) {}

  ngOnInit(): void {
    this.ac.keys.avalKeys().subscribe((v) => {
      this.rooms = v
    })
  }

  send() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value)
    } 
  }

}
