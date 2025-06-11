import { Component, OnInit } from '@angular/core'
import { Group } from 'src/app/types/group'
import { Status } from 'src/app/types/status'
import { MatDialog } from '@angular/material/dialog'
import { RemoveConfirmComponent } from './remove-confirm/remove-confirm.component'
import { GroupsService } from './groups.service'

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  standalone: false,
})
export class GroupsComponent implements OnInit {
  groups?: Group[]
  constructor(
    protected readonly acs: GroupsService,
    private readonly dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.acs.getGroups().subscribe(v => {
      this.groups = v
    })
  }

  private refreshIfGood(s: Status) {
    if (s.status.toString().match(/2\d\d/)) {
      this.ngOnInit()
    }
  }

  get groupOptions(): { id: string; text: string }[] {
    return this.groups!.map(v => {
      return { id: v._id as string, text: v.name as string }
    })
  }

  protected getId(g: Group[] | undefined) {
    if (!g) return undefined
    return g.map(v => v._id)
  }

  groupNames(groups: Group[]) {
    return groups.flatMap(g => g.name)
  }

  protected nameEdit(id: string, name: string | string[]) {
    name = name as string
    this.acs.editName(id, name).subscribe(s => this.refreshIfGood(s))
  }

  protected newGroup() {
    let name = prompt('Nazwa grupy')
    if (name) {
      this.acs.newGroup(name).subscribe(s => this.refreshIfGood(s))
    }
  }

  protected remove(id: string) {
    this.dialog
      .open(RemoveConfirmComponent)
      .afterClosed()
      .subscribe(v => {
        if (v) {
          this.acs.remove(id).subscribe(s => this.refreshIfGood(s))
        }
      })
  }
}
