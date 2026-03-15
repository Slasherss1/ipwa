import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
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
  private cdRef = inject(ChangeDetectorRef)

  @HostBinding('tabindex') tabindex = 0
  @Input() list?: string[]
  @Output() listChange = new EventEmitter<string[]>()
  @Input() converter?: unknown[]
  @Input() options?: { id: string; text: string }[]
  @Input() dropdown?: boolean
  @Input() dataList?: string
  @Output() edit = new EventEmitter<string[]>()

  @ViewChildren('input') inputList!: QueryList<ElementRef>

  protected _list: string[] = []
  workList: string[] = []
  focused = false

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  autoRemPos(event: Event, index: number) {
    if (index == 0) return;
    if (this.workList[index].length != 0) return;
    event.preventDefault()
    this.remPos(index)
    this.cdRef.detectChanges()
    this.inputList.get(index - 1)?.nativeElement.focus()
  }

  prev(index: number) {
    if (index == 0) return;
    this.inputList.get(index - 1)?.nativeElement.focus()
  }

  next(index: number) {
    if (this.workList[index+1] === undefined) {
      this.addPos(index)
    } else {
      this._next(index)
    }
  }

  addPos(index: number) {
    this.workList.splice(index + 1, 0, '')
    this._next(index)
  }

  private _next(index: number) {
    this.inputList.notifyOnChanges()
    this.cdRef.detectChanges()
    this.inputList.get(index + 1)?.nativeElement.focus()
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
