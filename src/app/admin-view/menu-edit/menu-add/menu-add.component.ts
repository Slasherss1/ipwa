import { Component, inject, signal } from '@angular/core'
import { MenuUploadComponent } from '../menu-upload/menu-upload.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { FDSelection } from 'src/app/fd.da'
import { FormControl, FormGroup } from '@angular/forms'
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker'
import { DateTime } from 'luxon'
import { weekendFilter } from 'src/app/util'

@Component({
  selector: 'app-menu-add',
  templateUrl: './menu-add.component.html',
  styleUrl: './menu-add.component.scss',
  providers: [
    { provide: MAT_DATE_RANGE_SELECTION_STRATEGY, useClass: FDSelection },
  ],
  standalone: false,
})
export class MenuAddComponent {
  public dialogRef: MatDialogRef<MenuAddComponent> = inject(MatDialogRef)
  private dialog = inject(MatDialog)

  type: string | undefined
  filter = weekendFilter

  day = signal<DateTime>(DateTime.now())

  range = new FormGroup({
    start: new FormControl<DateTime | null>(null),
    end: new FormControl<DateTime | null>(null),
  })

  submit() {
    switch (this.type) {
      case 'day':
        this.dialogRef.close({ type: 'day', value: this.day().toISODate() })
        break
      case 'week':
        this.dialogRef.close({
          type: 'week',
          value: { start: this.range.value.start?.toISODate(), count: 5 },
        })
        break
      default:
        break
    }
  }

  activateUpload() {
    this.dialog
      .open(MenuUploadComponent)
      .afterClosed()
      .subscribe(data => {
        if (data) {
          this.dialogRef.close({ type: 'file', ...data })
        }
      })
  }
}
