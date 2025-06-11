import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  public comp?: any
  public menu?: { title: string; check?: boolean; icon?: string; fn: string }[]
}
