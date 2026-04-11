import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DateTime } from 'luxon';
import { filter, Observable, Subject } from 'rxjs';
import { UpdatesService } from 'src/app/services/updates.service';
import { Menu } from 'src/app/types/menu';

const TAGS = {
  sn: ['Wada śniadania 1', 'Wada śniadania 2', 'Wada śniadania 3'],
  ob: ['Wada obiadu 1', 'Wada obiadu 2', 'Wada obiadu 3'],
  kol: ['Wada kolacji 1', 'Wada kolacji 2', 'Wada kolacji 3'],
  soup: ['Wada zupy 1', 'Wada zupy 2', 'Wada zupy 3'],
  cd: ['Wada dodatku 1', 'Wada dodatku 2', 'Wada dodatku 3'],
  dr: ['Wada napoju 1', 'Wada napoju 2', 'Wada napoju 3'],
  other: []
} as const

class PollItem {
  get value() {
    if (this.controls.dirty) {
      return {
        name: this.name,
        type: this.type,
        value: this.controls.value
      }
    } else {
      return {
        name: this.name,
        type: this.type,
        value: null
      }
    }
  }

  setValue(value: Observable<{ rating: number | null; tags: string[]; comment: string | null; }>) {
    value.subscribe((v) => {
      if (v) {
        this.controls.patchValue(v)
      }
    })
    return this
  }

  name: string;
  type: keyof typeof TAGS;
  controls: FormGroup<{
    rating: FormControl<number | null>,
    tags: FormControl<string[]>,
    comment: FormControl<string | null>
  }>

  constructor(name: string, type: keyof typeof TAGS, value?: typeof this.controls.value) {
    this.name = name
    this.type = type
    this.controls = new FormGroup({
      rating: new FormControl<number | null>(value?.rating ?? null),
      tags: new FormControl<string[]>(value?.tags ?? [], { nonNullable: true }),
      comment: new FormControl(value?.comment ?? '')
    })
  }
}

@Component({
  selector: 'app-poll-dialog',
  standalone: false,
  templateUrl: './poll-dialog.component.html',
  styleUrl: './poll-dialog.component.scss'
})
export class PollDialogComponent implements OnInit {
  data = inject(MAT_BOTTOM_SHEET_DATA) as { menu: Menu, type: 'sn' | 'ob' | 'kol', date: DateTime }
  ref = inject(MatBottomSheetRef)
  protected update = inject(UpdatesService)
  protected TAGS = TAGS

  protected loading = false;

  items = [] as PollItem[]

  private generateItem(name: string | undefined, type: keyof typeof TAGS, value: Observable<{ name: string, rating: number | null; tags: string[]; comment: string | null; }>) {
    if (name) {
      this.items.push(new PollItem(name, type).setValue(value.pipe(filter(v=>v.name === name))))
    }
  }

  private getData() {
    const subject = new Subject<{ name: string, rating: number | null; tags: string[]; comment: string | null; }>()
    this.loading = true
    this.update.getVote(this.data.date).subscribe((v) => {
      v.forEach((element: any) => {
        subject.next({name: element.name, ...element.vote})
      });
      this.loading = false
    })
    return subject.asObservable()
  }

  async ngOnInit() {
    const dataObs = this.getData()

    switch (this.data.type) {
      case 'sn':
        this.data.menu.sn.fancy.forEach((item) => {
          this.generateItem(item, 'sn', dataObs)
        })
        break
      case 'ob': {
        const wd = this.data.menu.ob
        this.generateItem(wd.soup, 'soup', dataObs)
        this.generateItem(wd.vege, 'ob', dataObs)
        this.generateItem(wd.meal, 'ob', dataObs)
        wd.condiments.forEach(v => this.generateItem(v, 'cd', dataObs))
        this.generateItem(wd.drink, 'dr', dataObs)
        wd.other.forEach(v => this.generateItem(v, 'other', dataObs))
        break
      }
      case 'kol':
        this.generateItem(this.data.menu.kol, 'kol', dataObs)
        break
    }
  }

  save() {
    this.ref.dismiss(this.items.map(v => v.value).filter(Boolean))
  }

  close() {
    this.ref.dismiss();
  }

  resetGroup(item: PollItem) {
    item.controls.reset()
    item.controls.markAsPristine()
  }
}
