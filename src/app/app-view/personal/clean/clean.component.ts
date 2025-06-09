import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { weekendFilter } from 'src/app/fd.da';
import { UpdatesService } from 'src/app/services/updates.service';
import { CleanNote } from 'src/app/types/clean-note';

@Component({
  selector: 'app-clean',
  templateUrl: './clean.component.html',
  styleUrl: './clean.component.scss'
})
export class CleanComponent implements OnInit {
  private _day: moment.Moment = moment()
  public get day(): moment.Moment {
    return this._day;
  }
  public set day(value: moment.Moment) {
    if (!this.filter(value)) value.isoWeekday(5);
    this._day = moment.utc(value).startOf('day');
    this.update()
  }
  grade: number | null = null
  notes: CleanNote[] = []
  tips: string = ""
  filter = weekendFilter
  
  constructor (private updates: UpdatesService) {
    this.day = moment.utc();
  }

  ngOnInit(): void {
    this.update()
  }
  
  update() {
    this.updates.getClean(this.day).subscribe((v) => {
      if (v) {
        this.grade = v.grade
        this.notes = v.notes
        this.tips = v.tips
      } else {
        this.grade = null
        this.notes = []
        this.tips = ""
      }
    })
  }

  protected gradeColor() {
    switch (this.grade) {
      case 1:
        return { color: "red" }
      case 2:
        return { color: "darkorange" }
      case 3:
        return { color: "orange" }
      case 4:
        return { color: "olive" }
      case 5:
        return { color: "green" }
      case 6:
        return { color: "springgreen" }
      default:
        return { color: "inherit" }
    }
  }
}
