import { Component, Inject } from '@angular/core'
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
  date: DateTime

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      _id: string
      message: { title: string; body: string }
      sentDate: string
    },
    public dialogRef: MatDialogRef<NotifDialogComponent>,
    private uc: UpdatesService
  ) {
    this.date = DateTime.fromISO(data.sentDate)
  }

  ack() {
    this.uc.postInfoAck(this.data._id).subscribe(v => {
      this.dialogRef.close()
    })
  }
}
