import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminCommService } from '../../admin-comm.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-new-key',
  templateUrl: './new-key.component.html',
  styleUrl: './new-key.component.scss'
})
export class NewKeyComponent implements OnInit {
  // @ViewChild('input') input!: ElementRef<HTMLInputElement>
  rooms: string[] = []
  form = new FormGroup({
    room: new FormControl<string>(""),
    user: new FormControl<string>("")
  })
  unames: any[] = []
  constructor ( private ac: AdminCommService, public dialogRef: MatDialogRef<NewKeyComponent> ) {}

  ngOnInit(): void {
    this.ac.keys.avalKeys().subscribe((v) => {
      this.rooms = v
    })
  }
  
  // filter() {
  //   const v = this.input.nativeElement.value
  //   console.log(v);
    
  //   if (v) {
  //     this.ac.userFilter(v.toLowerCase()).subscribe((v) => {
  //       this.unames = v
  //     })
  //   } else {
  //     this.unames = []
  //   }
  // }

  send() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value)
    } else {
      this.form.controls['user'].setErrors({unf: true})
    }
  }

}
