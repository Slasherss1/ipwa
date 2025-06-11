import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core'

@Component({
  selector: 'app-list-editor[list], app-list-editor[converter]',
  templateUrl: './list-editor.component.html',
  styleUrls: ['./list-editor.component.scss'],
  standalone: false,
})
export class ListEditorComponent implements OnChanges {
  @HostBinding('tabindex') tabindex = 0
  @Input() list?: string[]
  @Output() listChange = new EventEmitter<string[]>()
  @Input() converter?: any[]
  @Input() options?: { id: string; text: string }[]
  @Input() dropdown?: boolean
  @Input() dataList?: string
  @Output() edit = new EventEmitter<string[]>()

  @ViewChildren('input') inputList!: QueryList<ElementRef>

  protected _list: string[] = []
  workList: string[] = []
  focused = false

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.list) {
      this._list = [...this.list]
    } else if (this.converter) {
      this._list = [...this.converter.map(String)]
    }
  }

  @HostListener('focusin') focusin() {
    if (!this.focused) {
      if (this.list) {
        this.workList = [...this.list]
      } else if (this.converter) {
        this.workList = [...this.converter.map(String)]
      }
    }
    this.focused = true
  }

  save() {
    this.listChange.emit(this.workList)
    this.edit.emit(this.workList)
    this.focused = false
  }

  cancel() {
    this.focused = false
  }

  remPos(index: number) {
    this.workList.splice(index, 1)
  }

  addPos(index: number) {
    this.workList.splice(index + 1, 0, '')
    this.cdRef.detectChanges()
    this.inputList.get(index + 1)?.nativeElement.focus()
  }

  trackByIndex(index: number, _entry: any) {
    return index
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.workList, event.previousIndex, event.currentIndex)
  }

  protected idToOption(item: string) {
    return this.options?.find(v => {
      return v.id == item
    })?.text
  }
}
