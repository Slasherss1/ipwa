import { Component, Input } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-hour-display',
  templateUrl: './hour-display.component.html',
  styleUrl: './hour-display.component.scss'
})
export class HourDisplayComponent {
  @Input() value = "";
  
  style () {
    if (/(0+[0-9]|1[0-9]|2[0-3]):(0+[0-9]|[1-5][0-9])/g.test(this.value)) {
      var diff = moment(this.value, 'HH:mm').diff(moment(), 'minutes');
      if (diff > 30) {
        return { "background-color": "red" }
      } else if (diff > 0) {
        return { "background-color": "yellow", "color": "black"}
      } else {
        return { "background-color": "green"}
      }
    } else {
      return { "color": "gray"}
    }
  }
}
