import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core'
import { AdminCommService } from '../admin-comm.service'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { MatSnackBar } from '@angular/material/snack-bar'
import { UserEditComponent } from './user-edit/user-edit.component'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { Group } from 'src/app/types/group'
import User from 'src/app/types/user'

@Component({
  selector: 'app-account-mgmt',
  templateUrl: './account-mgmt.component.html',
  styleUrls: ['./account-mgmt.component.scss'],
  standalone: false,
})
export class AccountMgmtComponent implements OnInit, AfterViewInit {
  protected groups: Group[] = []
  users: MatTableDataSource<Omit<User, 'pass'>>
  loading = false
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(
    readonly ac: AdminCommService,
    private dialog: MatDialog,
    private sb: MatSnackBar,
    protected readonly ls: LocalStorageService
  ) {
    this.users = new MatTableDataSource<Omit<User, 'pass'>>()
    this.users.filterPredicate = (
      data: Record<string, any>,
      filter: string
    ): boolean => {
      const dataStr = Object.keys(data)
        .reduce((curr: string, key: string) => {
          if (['_id', 'admin', 'groups', '__v', 'locked'].find(v => v == key)) {
            return curr + ''
          }
          return curr + data[key] + '⫂'
        }, '')
        .toLowerCase()
      const filternew = filter.trim().toLowerCase()
      return dataStr.indexOf(filternew) != -1
    }
  }

  ngAfterViewInit() {
    this.users.paginator = this.paginator
  }

  ngOnInit() {
    this.loading = true
    this.ac.accs.getAccs().subscribe(data => {
      this.loading = false
      this.users.data = data.users
      this.groups = data.groups
    })
  }

  filter(event: Event) {
    const value = (event.target as HTMLInputElement).value
    this.users.filter = value.toLowerCase().trim()
  }

  openUserCard(id?: string) {
    this.dialog
      .open<
        UserEditComponent,
        UserEditComponent.InputData,
        UserEditComponent.ReturnData
      >(UserEditComponent, {
        data: { id: id, type: id ? 'edit' : 'new', groups: this.groups },
      })
      .afterClosed()
      .subscribe(r => {
        if (r) this.ngOnInit()
      })
  }

  collumns = ['name', 'surname', 'uname', 'actions']
}
