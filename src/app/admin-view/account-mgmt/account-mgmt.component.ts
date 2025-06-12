import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator'
import { UserEditComponent } from './user-edit/user-edit.component'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { Group } from 'src/app/types/group'
import User from 'src/app/types/user'
import { AccountMgmtService } from './account-mgmt.service'
import { STATE } from 'src/app/types/state'

@Component({
  selector: 'app-account-mgmt',
  templateUrl: './account-mgmt.component.html',
  styleUrls: ['./account-mgmt.component.scss'],
  standalone: false,
})
export class AccountMgmtComponent implements AfterViewInit {
  protected groups: Group[] = []
  users: MatTableDataSource<Omit<User, 'pass'>>
  @ViewChild(MatPaginator) paginator!: MatPaginator

  constructor(
    protected ac: AccountMgmtService,
    private dialog: MatDialog,
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
    this.ac.refresh()
    this.ac.accs.subscribe(d => {
      this.users.data = d ?? []
    })
  }

  protected get STATE(): typeof STATE {
    return STATE
  }

  ngAfterViewInit() {
    this.users.paginator = this.paginator
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
        if (r) this.ac.refresh()
      })
  }

  collumns = ['name', 'surname', 'uname', 'actions']
}
