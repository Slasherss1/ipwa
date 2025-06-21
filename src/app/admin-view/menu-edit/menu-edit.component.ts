import { Component, inject } from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker'
import { FDSelection } from 'src/app/fd.da'
import { Menu } from 'src/app/types/menu'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { MenuUploadComponent } from './menu-upload/menu-upload.component'
import { Status } from 'src/app/types/status'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MenuAddComponent } from './menu-add/menu-add.component'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { DateTime } from 'luxon'
import { MenuEditService } from './menu-edit.service'
import { MenuOptions } from './menu-edit.model'

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss'],
  providers: [
    { provide: MAT_DATE_RANGE_SELECTION_STRATEGY, useClass: FDSelection },
  ],
  standalone: false,
})
export class MenuEditComponent {
  protected ac = inject(MenuEditService)
  private dialog = inject(MatDialog)
  private sb = inject(MatSnackBar)
  readonly ls = inject(LocalStorageService)

  dcols: string[] = ['day', 'sn', 'ob', 'kol']
  dataSource: MatTableDataSource<Menu> = new MatTableDataSource<Menu>()
  range = new FormGroup({
    start: new FormControl<DateTime | null>(null),
    end: new FormControl<DateTime | null>(null),
  })
  loading = false
  public options?: MenuOptions

  constructor() {
    this.range.valueChanges.subscribe(v => {
      this.ac.setDates(v.start!, v.end!)
    })
    this.ac.menuItems.subscribe(v => {
      this.dataSource.data = v
    })
  }

  print() {
    this.ac
      .print(this.range.value.start, this.range.value.end)
      ?.subscribe(r => {
        if (r && r.length > 0) {
          const mywindow = window.open(
            undefined,
            'Drukowanie',
            'height=400,width=400'
          )
          mywindow?.document.write(r)
          mywindow?.print()
          mywindow?.close()
        }
      })
  }

  addDate() {
    this.dialog
      .open(MenuAddComponent)
      .afterClosed()
      .subscribe(data => {
        if (data) {
          switch (data.type) {
            case 'day':
              this.ac.new
                .single(data.value)
                .subscribe(s => this.refreshIfGood(s))
              break
            case 'week':
              this.ac.new
                .range(data.value.start, data.value.count)
                .subscribe(s => this.refreshIfGood(s))
              break
            case 'file':
              this.refresh()
              break
            default:
              break
          }
        }
      })
  }

  refresh() {
    this.ac.refresh()
    this.ac.getOpts().subscribe(o => {
      this.options = o
    })
  }

  private refreshIfGood(s: Status) {
    if (s.status.toString().match(/2\d\d/)) this.refresh()
  }

  activateUpload() {
    this.dialog
      .open(MenuUploadComponent)
      .afterClosed()
      .subscribe(data => {
        if (data) this.refresh()
      })
  }

  editSn(id: string) {
    this.ac
      .editSn(id, this.dataSource.data.find(v => v._id == id)!.sn)
      .subscribe(s => this.refreshIfGood(s))
  }

  editOb(id: string) {
    this.ac
      .editOb(id, this.dataSource.data.find(v => v._id == id)!.ob)
      .subscribe(s => this.refreshIfGood(s))
  }

  editKol(id: string) {
    this.ac
      .editKol(id, this.dataSource.data.find(v => v._id == id)?.kol)
      .subscribe(s => this.refreshIfGood(s))
  }

  editTitle(id: string) {
    this.ac
      .editTitle(id, this.dataSource.data.find(v => v._id == id)?.dayTitle)
      .subscribe(s => this.refreshIfGood(s))
  }

  getStat(day: DateTime, m: 'ob' | 'kol') {
    this.ac
      .stat(day, m)
      .subscribe(s =>
        this.sb.open(
          `${s.y} / ${s.y + s.n} = ${((s.y / (s.y + s.n)) * 100).toFixed(2)}%`,
          'Zamknij',
          { duration: 2500 }
        )
      )
  }

  remove(id: string) {
    this.ac.rm(id).subscribe(s => this.refreshIfGood(s))
  }
}
