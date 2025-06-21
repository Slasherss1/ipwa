import { Component, inject } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { DateTime } from 'luxon'
import { UpdatesService } from 'src/app/services/updates.service'

@Component({
  selector: 'app-notif-dialog',
  templateUrl: './notif-dialog.component.html',
  styleUrl: './notif-dialog.component.scss',
  standalone: false,
})
export class NotifDialogComponent {
  public data: {
    _id: string
    message: { title: string; body: string }
    sentDate: string
  } = inject(MAT_DIALOG_DATA)
  public dialogRef: MatDialogRef<NotifDialogComponent> = inject(MatDialogRef)
  private uc = inject(UpdatesService)

  date: DateTime

  constructor() {
    this.date = DateTime.fromISO(this.data.sentDate)
  }

  ack() {
    this.uc.postInfoAck(this.data._id).subscribe(() => {
      this.dialogRef.close()
    })
  }
}
