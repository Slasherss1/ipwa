import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core'
import { MatPaginator } from '@angular/material/paginator'
import { MatTableDataSource } from '@angular/material/table'
import { AKey } from 'src/app/types/key'
import { MatDialog } from '@angular/material/dialog'
import { NewKeyComponent } from './new-key/new-key.component'
import { catchError, throwError } from 'rxjs'
import { MatSnackBar } from '@angular/material/snack-bar'
import { KeyService } from './key.service'

@Component({
  selector: 'app-admin-key',
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss',
  standalone: false,
})
export class AdminKeyComponent implements AfterViewInit, OnInit {
  private ac = inject(KeyService)
  private dialog = inject(MatDialog)
  private sb = inject(MatSnackBar)

  keys: MatTableDataSource<AKey> = new MatTableDataSource<AKey>()
  pureData: AKey[] = []
  private _filters: string[] = []
  public get filters(): string[] {
    return this._filters
  }
  public set filters(value: string[]) {
    if (value.includes('showAll')) {
      this.collumns = ['room', 'whom', 'borrow', 'tb', 'actions']
    } else {
      this.collumns = ['room', 'whom', 'borrow', 'actions']
    }
    this._filters = value
    this.transformData()
  }

  collumns = ['room', 'whom', 'borrow', 'tb', 'actions']

  loading = true
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(
  ) {
    this.filters = []
  }

  fetchData() {
    this.loading = true
    this.ac.getKeys().subscribe(r => {
      this.loading = false
      this.pureData = r
      this.transformData()
    })
  }

  transformData() {
    let finalData: AKey[] = this.pureData
    if (!this.filters.includes('showAll'))
      finalData = finalData.filter(v => v.tb == undefined)
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
  }

  new() {
    this.dialog
      .open(NewKeyComponent)
      .afterClosed()
      .subscribe(v => {
        if (v) {
          this.ac
            .postKey(v.room, v.user)
            .pipe(
              catchError((err) => {
                if (err.status == 404) {
                  this.sb.open('Nie znaleziono użytkownika', undefined, {
                    duration: 2500,
                  })
                }
                return throwError(() => new Error(err.message))
              })
            )
            .subscribe(s => {
              if (s.status == 201) {
                this.fetchData()
              }
            })
        }
      })
  }

  tb(id: string) {
    this.ac.returnKey(id).subscribe(r => {
      if (r.status == 200) {
        this.fetchData()
      }
    })
  }
}
