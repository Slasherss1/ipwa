import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { DateTime } from 'luxon';
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
    }
    return;
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

  private _serverData: any[] = []

  items = [] as PollItem[]

  private generateItem(name: string | undefined, type: keyof typeof TAGS) {
    if (name) {
      this.items.push(new PollItem(name, type, this._serverData.find((v) => v.name == name)))
    }
  }

  private async getData() {
    return new Promise<void>((resolve) => {
      this.update.getVote(this.data.date).subscribe((v) => {
        this._serverData = v ?? []
        resolve()
      })
    })
  }

  async ngOnInit() {
    await this.getData()

    switch (this.data.type) {
      case 'sn':
        this.data.menu.sn.fancy.forEach((item) => {
          this.generateItem(item, 'sn')
        })
        break
      case 'ob': {
        const wd = this.data.menu.ob
        this.generateItem(wd.soup, 'soup')
        this.generateItem(wd.vege, 'ob')
        this.generateItem(wd.meal, 'ob')
        wd.condiments.forEach(v => this.generateItem(v, 'cd'))
        this.generateItem(wd.drink, 'dr')
        wd.other.forEach(v => this.generateItem(v, 'other'))
        break
      }
      case 'kol':
        this.generateItem(this.data.menu.kol, 'kol')
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
