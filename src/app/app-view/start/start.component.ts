import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Link } from 'src/app/types/link';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  private readonly _LINKS: Link[] = [
    { title: "Jadłospis (z funkcją głosowania)", href: "menu", icon: "restaurant_menu", enabled: this.ls.capCheck(2) },
    { title: "Wiadomości", href: "news", icon: "newspaper", enabled: this.ls.capCheck(1) },
    { title: "Ustawienia konta", href: "grades", icon: "settings_account_box", enabled: true },
    { title: "Klucze do sal", href: "grades", icon: "key", enabled: this.ls.capCheck(32) },
    { title: "Oceny za czystość", href: "grades", icon: "cleaning_services", enabled: this.ls.capCheck(16) },
    { title: "Administracja", href: "grades", icon: "admin_panel_settings", enabled: this.ls.admin != 0 },
  ];
  public get LINKS(): Link[] {
    return this._LINKS.filter(v => v.enabled);
  }
  constructor(private r: Router, private readonly route: ActivatedRoute, private ls: LocalStorageService) { }
  protected redirect(link: any) {
    this.r.navigate([link], { relativeTo: this.route })
  }
}
