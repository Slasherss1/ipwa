import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { FDSelection } from 'src/app/fd.da';
import { Menu } from 'src/app/types/menu';
import { AdminCommService } from '../admin-comm.service';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { MenuUploadComponent } from './menu-upload/menu-upload.component';
import { Status } from 'src/app/types/status';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MenuAddComponent } from './menu-add/menu-add.component';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-menu-new',
  templateUrl: './menu-new.component.html',
  styleUrls: ['./menu-new.component.scss'],
  providers: [
    {provide: MAT_DATE_RANGE_SELECTION_STRATEGY, useClass: FDSelection}
  ]
})
export class MenuNewComponent {
  dcols: string[] = ['day', 'sn', 'ob', 'kol']
  dataSource: MatTableDataSource<Menu> = new MatTableDataSource<Menu>()
  range = new FormGroup({
    start: new FormControl<Moment|null>(null),
    end: new FormControl<Moment|null>(null),
  })
  loading = false
  public options: any;

  constructor (private ac: AdminCommService, private dialog: MatDialog, private sb: MatSnackBar, readonly ls: LocalStorageService) { 
    moment.updateLocale('pl', {
      weekdays: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]
    })
  }

  print() {
    this.ac.menu.print(this.range.value.start, this.range.value.end)?.subscribe((r) => {
      if (r && r.length > 0) {
        var mywindow = window.open(undefined, 'Drukowanie', 'height=400,width=400')
        mywindow?.document.write(r)
        mywindow?.print()
        mywindow?.close()
      }
    })
  }

  addDate() {
    this.dialog.open(MenuAddComponent).afterClosed().subscribe((data) => {
      if (data) {
        switch (data.type) {
          case "day":
            this.ac.menu.new.single(data.value).subscribe(s => this.refreshIfGood(s))
            break;
          case "week":
            this.ac.menu.new.range(data.value.start, data.value.count).subscribe(s => this.refreshIfGood(s))
            break;
          case "file":
            this.requestData()
            break;
          default:
            break;
        }
      }
    })
  }
  
  requestData() {
    this.loading = true
    this.ac.menu.getOpts().subscribe((o) => {
      this.options = o;
    })
    this.ac.menu.getMenu(this.range.value.start, this.range.value.end)?.subscribe((data) => {
      this.loading = false
      this.dataSource.data = data.map((v) => {
        let newMenu: Menu = {
          ...v,
          day: moment.utc(v.day)
        }
        return newMenu
      })
    })
  }

  private refreshIfGood(s: Status) {
    if (s.status.toString().match(/2\d\d/)) {
      this.requestData()
    }
  }
  
  activateUpload() {
    this.dialog.open(MenuUploadComponent).afterClosed().subscribe((data) => {
      if (data) {
        this.requestData()
      }
    })
  }

  editSn(id: string) {
    this.ac.menu.editSn(id, this.dataSource.data.find(v => v._id == id)?.sn).subscribe(s => this.refreshIfGood(s))
  }

  editOb(id: string) {
    this.ac.menu.editOb(id, this.dataSource.data.find(v => v._id == id)?.ob).subscribe(s => this.refreshIfGood(s))
  }

  editKol(id: string) {
    this.ac.menu.editKol(id, this.dataSource.data.find(v => v._id == id)?.kol).subscribe(s => this.refreshIfGood(s))
  }

  editTitle(id: string) {
    this.ac.menu.editTitle(id, this.dataSource.data.find(v => v._id == id)?.dayTitle).subscribe(s => this.refreshIfGood(s))
  }

  getStat(day: moment.Moment, m: "ob" | "kol") {
    this.ac.menu.stat(day, m).subscribe((s) => this.sb.open(`${s.y} / ${s.y+s.n} = ${((s.y/(s.y+s.n))*100).toFixed(2)}%`, "Zamknij", {duration: 2500}))
  }

  remove(id: string) {
    this.ac.menu.rm(id).subscribe(s => this.refreshIfGood(s))
  }
}
