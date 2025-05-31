import { Component, Input, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { ToolbarService } from './toolbar.service';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Input() drawer!: MatDrawer;
  @ViewChild(MatMenuTrigger) trigger!: MatMenuTrigger;

  protected _menu?: typeof this.toolbar.menu

  constructor(readonly title: Title, protected toolbar: ToolbarService) {
    
  }

  openMenu () {
    this._menu = this.toolbar.menu
    this.trigger.openMenu()
  }
}
