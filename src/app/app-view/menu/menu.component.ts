import { Component, inject, signal } from '@angular/core'
import { UpdatesService } from '../../services/updates.service'
import { Menu } from '../../types/menu'
import { MatBottomSheet } from '@angular/material/bottom-sheet'
import { AllergensComponent } from './allergens/allergens.component'
import { filterLook, weekendFilter } from '../../util'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { DateTime } from 'luxon'
import { toObservable } from '@angular/core/rxjs-interop'
import { PollDialogComponent } from './poll-dialog/poll-dialog.component'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: false,
})
export class MenuComponent {
  private uc = inject(UpdatesService)
  private bs = inject(MatBottomSheet)
  protected ls = inject(LocalStorageService)

  constructor() {
    toObservable(this.day).subscribe(() => {
      this.updateMenu()
    })
  }
  loading = true

  public filter = weekendFilter

  day = signal<DateTime>(filterLook(this.filter, "ahead", DateTime.now(), 7)!)

  menu?: Menu
  get getsn() {
    return this.menu && this.checkIfAnyProperty(this.menu.sn)
      ? this.menu.sn
      : null
  }
  get getob() {
    return this.menu && this.checkIfAnyProperty(this.menu.ob)
      ? this.menu.ob
      : null
  }
  get getkol() {
    return this.menu && this.menu.kol ? this.menu.kol : null
  }
  get gettitle() {
    return this.menu && this.menu.dayTitle && this.menu.dayTitle != ''
      ? this.menu.dayTitle
      : null
  }

  private checkIfAnyProperty(obj: Record<string, string | string[]>) {
    for (const i in obj) {
      if (Array.isArray(obj[i])) {
        if (obj[i].length > 0) return true
      } else {
        if (obj[i]) return true
      }
    }
    return false
  }

  updateMenu(silent?: boolean) {
    this.loading = !silent
    if (!silent) this.menu = undefined
    this.uc.getMenu(this.day()).subscribe(m => {
      this.loading = false
      this.menu = m
    })
  }

  alrg() {
    this.bs.open(AllergensComponent)
  }

  protected vegeColor(text: string) {
    if (text.startsWith('V: ')) {
      return '#43A047'
    }
    return 'inherit'
  }

  openPoll(type: "sn" | "ob" | "kol") {
    this.bs.open(PollDialogComponent, {
      data: {
        menu: this.menu,
        type,
        date: this.day()
      }
    }).afterDismissed().subscribe((v) => {
      if (v) console.log(v); else return
      this.uc.postVote(this.day(), v).subscribe(s => {
        console.log(s);

      })
    })
  }
}
