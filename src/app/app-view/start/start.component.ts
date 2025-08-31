import { Component, inject } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { LocalStorageService } from 'src/app/services/local-storage.service'
import { Link } from 'src/app/types/link'

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss',
  standalone: false,
})
export class StartComponent {
  private r = inject(Router)
  private route = inject(ActivatedRoute)
  private ls = inject(LocalStorageService)

  private readonly _LINKS: Link[] = [
    {
      title: 'Jadłospis (z funkcją głosowania)',
      href: 'menu',
      icon: 'restaurant_menu',
      enabled: this.ls.capCheck("menu"),
    },
    {
      title: 'Wiadomości',
      href: 'news',
      icon: 'newspaper',
      enabled: this.ls.capCheck("news"),
    },
    {
      title: 'Ustawienia konta',
      href: 'grades',
      icon: 'settings_account_box',
      enabled: true,
    },
    {
      title: 'Klucze do sal',
      href: 'grades',
      icon: 'key',
      enabled: this.ls.capCheck("key"),
    },
    {
      title: 'Oceny za czystość',
      href: 'grades',
      icon: 'cleaning_services',
      enabled: this.ls.capCheck("clean"),
    },
    {
      title: 'Administracja',
      href: 'grades',
      icon: 'admin_panel_settings',
      enabled: this.ls.isAdmin,
    },
  ]
  public get LINKS(): Link[] {
    return this._LINKS.filter(v => v.enabled)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected redirect(link: any) {
    this.r.navigate([link], { relativeTo: this.route })
  }
}
