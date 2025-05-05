import { Component, OnInit } from '@angular/core';
import { AdminCommService } from '../admin-comm.service';
import { Group } from 'src/app/types/group';
import { Status } from 'src/app/types/status';
import { MatDialog } from '@angular/material/dialog';
import { RemoveConfirmComponent } from './remove-confirm/remove-confirm.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups?: Group[]
  constructor (protected readonly acs: AdminCommService, private readonly dialog: MatDialog) {}
  ngOnInit(): void {
    this.acs.groups.getGroups().subscribe((v) => {
      this.groups = v
    })
  }

  private refreshIfGood(s: Status) {
    if (s.status.toString().match(/2\d\d/)) {
      this.ngOnInit()
    }
  }

  get groupOptions(): {id: string, text: string}[] {
    return this.groups!.map((v)=> {return {id: v._id as string, text: v.name as string}})
  }

  protected getId(g: Group[] | undefined) {
    if (!g) return undefined
    return g.map((v)=>v._id)
  }

  groupNames(groups: Group[]) {
    return groups.flatMap((g) => g.name)
  }

  protected nameEdit(id: string, name: string | string[]) {
    name = name as string
    this.acs.groups.editName(id, name).subscribe((s) => this.refreshIfGood(s))
  }

  protected newGroup() {
    let name = prompt("Nazwa grupy")
    if (name) {
      this.acs.groups.newGroup(name).subscribe((s) => this.refreshIfGood(s))
    }
  }
  
  protected remove(id: string) {
    this.dialog.open(RemoveConfirmComponent).afterClosed().subscribe((v) => {
      if (v) {
        this.acs.groups.remove(id).subscribe((s) => this.refreshIfGood(s))
      }
    })
  }
}
