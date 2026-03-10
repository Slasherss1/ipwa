import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Menu } from 'src/app/types/menu';

const TAGS = {
  sn: ['Wada śniadania 1', 'Wada śniadania 2', 'Wada śniadania 3'],
  ob: ['Wada obiadu 1', 'Wada obiadu 2', 'Wada obiadu 3'],
  kol: ['Wada kolacji 1', 'Wada kolacji 2', 'Wada kolacji 3'],
  soup: ['Wada zupy 1', 'Wada zupy 2', 'Wada zupy 3'],
  cd: ['Wada dodatku 1', 'Wada dodatku 2', 'Wada dodatku 3'],
  dr: ['Wada napoju 1', 'Wada napoju 2', 'Wada napoju 3'],
  null: []
} as const

class PollItem {
  name: string;
  type: keyof typeof TAGS;
  value: FormGroup<{
    rating: FormControl<number | null>,
    tags: FormControl<string[]>,
    comment: FormControl<string | null>
  }>

  constructor(name: string, type: keyof typeof TAGS) {
    this.name = name
    this.type = type
    this.value = new FormGroup({
      rating: new FormControl<number | null>(null),
      tags: new FormControl<string[]>([], { nonNullable: true }),
      comment: new FormControl('')
    })
  }
}

@Component({
  selector: 'app-poll-dialog',
  standalone: false,
  templateUrl: './poll-dialog.component.html',
  styleUrl: './poll-dialog.component.scss'
})
export class PollDialogComponent {
  data = inject(MAT_BOTTOM_SHEET_DATA) as { menu: Menu, type: 'sn' | 'ob' | 'kol' }
  ref = inject(MatBottomSheetRef)

  protected TAGS = TAGS

  items = [] as PollItem[]

  private generateItem(name: string | undefined, type: keyof typeof TAGS) {
    if (name) {
      this.items.push(new PollItem(name, type))
    }
  }

  constructor() {
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
        wd.other.forEach(v => this.generateItem(v, 'null'))
        break
      }
      case 'kol':
        this.generateItem(this.data.menu.kol, 'kol')
        break
    }
  }

  close() {
    this.ref.dismiss();
  }
}
