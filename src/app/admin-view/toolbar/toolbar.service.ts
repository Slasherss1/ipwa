import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public comp?: any
  public menu?: { title: string; check?: boolean; icon?: string; fn: string }[]
}
