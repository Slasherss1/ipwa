import { Component, OnInit } from '@angular/core';
import { UpdatesService } from '../../services/updates.service';
import { Menu } from '../../types/menu';
import * as moment from 'moment';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AllergensComponent } from './allergens/allergens.component';
import { weekendFilter } from "../../fd.da";
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
    constructor(private uc:UpdatesService, readonly bs: MatBottomSheet, readonly ls: LocalStorageService) { 
      this.day = moment.utc()
    }
    loading = true

    public filter = weekendFilter
    
    private _day!: moment.Moment;
    public get day(): moment.Moment {
      return this._day;
    }
    public set day(value: moment.Moment) {
      // if (value.isAfter(moment.utc("19:15:00", "HH:mm:ss"))) value.add(1, "day")
      if (!this.filter(value)) value.isoWeekday(8);
      this._day = moment.utc(value).startOf('day');
      this.updateMenu()
    }
    
    menu?: Menu;
    get getsn() {return (this.menu && this.checkIfAnyProperty(this.menu.sn)) ? this.menu.sn : null}
    get getob() {return (this.menu && this.checkIfAnyProperty(this.menu.ob)) ? this.menu.ob : null}
    get getkol() {return (this.menu && this.menu.kol) ? this.menu.kol : null}
    get gettitle() {return (this.menu && this.menu.dayTitle && this.menu.dayTitle != "") ? this.menu.dayTitle : null}
    
    private checkIfAnyProperty(obj: { [x: string]: string | string[];}) {
      for (let i in obj) {
        if (Array.isArray(obj[i])) {
          if (obj[i].length > 0) return true
        } else {
          if (!!obj[i]) return true
        }
      }
      return false
    }

    capitalize(str: string) {
      return str.charAt(0).toUpperCase()+str.substring(1)
    }

    updateMenu(silent?: boolean) {
      this.loading = !silent
      if (!silent) this.menu = undefined
      this.uc.getMenu(this.day).subscribe(m => {
        this.loading = false
        this.menu = m
        console.log(m);
        
      })
    }

    alrg() {
      this.bs.open(AllergensComponent)
    }

    protected vegeColor(text: string) {
      if (text.startsWith("V: ")) {
        return "#43A047"
      }
      return "inherit"
    }

    vote(type: "ob" | "kol", vote: "-" | "+" | "n") {
      this.uc.postVote(this.menu!.day, type, vote).subscribe((data) => {
        this.updateMenu(true)
      })
    }
}
