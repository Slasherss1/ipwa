import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core'

@Component({
  selector: 'app-room-chooser',
  templateUrl: './room-chooser.component.html',
  styleUrl: './room-chooser.component.scss',
  standalone: false,
})
export class RoomChooserComponent implements OnChanges {
  @Input() rooms: string[] = []
  private _roomIndex: number = 0
  public get roomIndex(): number {
    return this._roomIndex
  }
  public set roomIndex(value: number) {
    if (value < 0 || value + 1 > this.rooms.length) {
      return
    }
    this._roomIndex = value
  }
  private _room: string = this.rooms[this.roomIndex]
  protected get room_1() {
    return this._room
  }
  protected set room_1(value) {
    this.room.emit(value)
    this._room = value
  }
  @Output() room: EventEmitter<string> = new EventEmitter<string>()

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rooms'] && this.rooms) {
      if (this.rooms.length > 0) {
        this._roomIndex = 0
        this.room_1 = this.rooms[this.roomIndex]
      }
    }
  }

  prevRoom() {
    this.roomIndex -= 1
    this.room_1 = this.rooms[this.roomIndex]
  }

  nextRoom() {
    this.roomIndex += 1
    this.room_1 = this.rooms[this.roomIndex]
  }
}
