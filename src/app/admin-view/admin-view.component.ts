import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { LocalStorageService } from '../services/local-storage.service'
import { Link } from '../types/link'

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss'],
  standalone: false,
})
export class AdminViewComponent {
  private readonly _LINKS: Link[] = [
    {
      title: 'Wiadomości',
      icon: 'newspaper',
      href: 'news',
      enabled: this.ls.permChecker("news") && this.ls.capCheck(1),
    },
    {
      title: 'Jadłospis',
      icon: 'restaurant_menu',
      href: 'menu',
      enabled: this.ls.permChecker("menu") && this.ls.capCheck(2),
    },
    {
      title: 'Wysyłanie powiadomień',
      icon: 'notifications',
      href: 'notifications',
      enabled: this.ls.permChecker("notif") && this.ls.capCheck(4),
    },
    {
      title: 'Grupy',
      icon: 'groups',
      href: 'groups',
      enabled: this.ls.permChecker("groups") && this.ls.capCheck(8),
    },
    {
      title: 'Zarządzanie kontami',
      icon: 'manage_accounts',
      href: 'accounts',
      enabled: this.ls.permChecker("accs"),
    },
    {
      title: 'Klucze',
      icon: 'key',
      href: 'keys',
      enabled: this.ls.permChecker("keys") && this.ls.capCheck(32),
    },
    {
      title: 'Czystość',
      icon: 'cleaning_services',
      href: 'grades',
      enabled: this.ls.permChecker("grades") && this.ls.capCheck(16),
    },
    {
      title: 'Frekwencja',
      icon: 'checklist',
      href: 'attendence',
      enabled: false,
    },
    {
      title: 'Ustawienia',
      icon: 'settings_applications',
      href: 'settings',
      enabled: this.ls.permChecker("super"),
    },
  ]
  public get LINKS(): Link[] {
    return this._LINKS.filter(v => v.enabled)
  }
  constructor(
    readonly router: Router,
    readonly ls: LocalStorageService
  ) {}
  goNormal() {
    this.router.navigateByUrl('app')
  }
}
