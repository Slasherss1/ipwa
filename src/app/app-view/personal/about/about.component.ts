import { Component } from '@angular/core'
import { Link } from 'src/app/types/link'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: false,
})
export class AboutComponent {
  LINKS: { title: string; info: string; icon: string; link: string }[] = [
    {
      title: 'Autor',
      info: 'Jan Szumotalski',
      icon: 'person',
      link: 'https://github.com/Slasherss1/',
    },
    {
      title: 'Źrodło',
      info: 'Aplikacja jest darmowa i może ją uruchomić każdy!',
      icon: 'code',
      link: 'https://github.com/Slasherss1/ipwa-selfhosted',
    },
    {
      title: 'Licencja',
      info: 'GPL-3.0',
      icon: 'license',
      link: 'https://www.gnu.org/licenses/gpl-3.0-standalone.html',
    },
  ]
}
