import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-room-chooser',
  templateUrl: './room-chooser.component.html',
  styleUrl: './room-chooser.component.scss'
})
export class RoomChooserComponent implements OnChanges {
  @Input() rooms: number[] = []
  private _roomIndex: number = 0;
  public get roomIndex(): number {
    return this._roomIndex;
  }
  public set roomIndex(value: number) {
    if (value < 0 || value+1 > this.rooms.length) {
      return
    }
    this._roomIndex = value;
  }
  private _room: number = this.rooms[this.roomIndex];
  protected get room_1(): number {
    return this._room;
  }
  protected set room_1(value: number) {
    this.room.emit(value)
    this._room = value;
  }
  @Output() room: EventEmitter<number> = new EventEmitter<number>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["rooms"] && this.rooms) {
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
