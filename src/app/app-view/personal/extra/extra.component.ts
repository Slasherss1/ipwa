import { ComponentType } from '@angular/cdk/portal'
import { Component } from '@angular/core'
import { Link } from 'src/app/types/link'
import { RedirectComponent } from './redirect/redirect.component'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrl: './extra.component.scss',
  standalone: false,
})
export class ExtraComponent {
  constructor(private dialog: MatDialog) {}

  private readonly _LINKS: (Omit<Link, 'href'> & {
    component: ComponentType<any>
  })[] = [
    {
      title: 'Domyślna strona po logowaniu',
      component: RedirectComponent,
      enabled: true,
      icon: 'home',
    },
  ]

  public get LINKS() {
    return this._LINKS.filter(v => {
      return v.enabled
    })
  }

  open(component: ComponentType<any>) {
    this.dialog.open(component)
  }
}
