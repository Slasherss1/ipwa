import { Component, inject, OnInit } from '@angular/core'
import { UpdatesService } from 'src/app/services/updates.service'
import { UKey } from 'src/app/types/key'

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrl: './key.component.scss',
  standalone: false,
})
export class KeyComponent implements OnInit {
  private us = inject(UpdatesService)

  keys!: UKey[]

  ngOnInit(): void {
    this.us.getKeys().subscribe(v => {
      this.keys = v
    })
  }
}
