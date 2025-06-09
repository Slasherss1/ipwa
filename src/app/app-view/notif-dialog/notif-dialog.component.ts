import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { UpdatesService } from 'src/app/services/updates.service';

@Component({
    selector: 'app-notif-dialog',
    templateUrl: './notif-dialog.component.html',
    styleUrl: './notif-dialog.component.scss',
    standalone: false
})
export class NotifDialogComponent {

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: {_id: string, message: {title: string, body: string}, sentDate: moment.Moment},
    public dialogRef: MatDialogRef<NotifDialogComponent>,
    private uc: UpdatesService
  ) {
    data.sentDate = moment(data.sentDate)
  }

  ack () {
    this.uc.postInfoAck(this.data._id).subscribe((v) => {
      this.dialogRef.close()
    })
  }

}
