import { Component, inject, OnInit } from '@angular/core'
import { MatDialogRef } from '@angular/material/dialog'
import { FormControl, FormGroup } from '@angular/forms'
import { UserSearchResult } from 'src/app/commonComponents/user-search/user-search.component'
import { KeyService } from '../key.service'

@Component({
  selector: 'app-new-key',
  templateUrl: './new-key.component.html',
  styleUrl: './new-key.component.scss',
  standalone: false,
})
export class NewKeyComponent implements OnInit {
  private ac = inject(KeyService)
  public dialogRef: MatDialogRef<NewKeyComponent> = inject(MatDialogRef)

  rooms: string[] = []
  form = new FormGroup({
    room: new FormControl<string>(''),
    user: new FormControl<UserSearchResult | null>(null),
  })

  ngOnInit(): void {
    this.ac.avalKeys().subscribe(v => {
      this.rooms = v
    })
  }

  send() {
    if (this.form.valid) this.dialogRef.close(this.form.value)
  }
}
