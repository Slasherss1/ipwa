import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { AKey } from 'src/app/types/key';
import { AdminCommService } from '../admin-comm.service';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewKeyComponent } from './new-key/new-key.component';

@Component({
  selector: 'app-admin-key',
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss'
})
export class AdminKeyComponent implements AfterViewInit, OnInit {
  keys: MatTableDataSource<AKey> = new MatTableDataSource<AKey>();
  pureData: AKey[] = []
  private _filters: string[] = [];
  public get filters(): string[] {
    return this._filters;
  }
  collumns = ['room', 'whom', 'borrow', 'tb', 'actions']
  public set filters(value: string[]) {
    if (value.includes("showAll")) {
      this.collumns = ['room', 'whom', 'borrow', 'tb', 'actions']
    } else {
      this.collumns = ['room', 'whom', 'borrow', 'actions']
    }
    this._filters = value;
    this.transformData();
  }
  loading = true
  @ViewChild(MatPaginator) paginator!: MatPaginator
  
  constructor (private ac: AdminCommService, private dialog: MatDialog) {
    this.filters = []
  }
  
  fetchData() {
    this.loading = true
    this.ac.keys.getKeys().subscribe((r) => {
      this.loading = false
      this.pureData = r
      this.transformData()
    })
  }

  transformData() {
    var finalData: AKey[] = this.pureData
    if (!this.filters.includes('showAll')) finalData = finalData.filter((v) => v.tb == undefined)
    this.keys.data = finalData
  }
  
  filter(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.keys.filter = value.toLowerCase().trim()
  }
  
  ngAfterViewInit(): void {
    this.keys.paginator = this.paginator
  }

  ngOnInit(): void {
    this.fetchData()
    // [
    //   {room: "Kawiarenka", borrow: moment().subtract(15, "minutes"), whom: {_id: "test", room: 303, uname: "sk"}}
    // ]
  }
  
  new() {
    this.dialog.open(NewKeyComponent).afterClosed().subscribe(v => {
      if (v) {
        this.ac.keys.postKey(v.room, v.user).subscribe((s) => {
          if (s.status == 201) {
            this.fetchData()
          }
        })
      }
    })
  }
  
  tb(id: string) {
    this.ac.keys.returnKey(id).subscribe((r) => {
      if (r.status == 200) {
        this.fetchData()
      }
    })
  }
}
