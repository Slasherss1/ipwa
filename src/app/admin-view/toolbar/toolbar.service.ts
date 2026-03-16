import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  /**
   * In order to use this variable properly:
   *
   * In component's constructor set the ToolbarService's comp property to the component instance like following:
   * ```ts
   * ToolbarService#comp = this
   * ```
   *
   * In component's onDestroy:
   * ```ts
   * ToolbarService#comp = undefined
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public comp?: any

  /**
   * @param check - whether to show the option
   * @param fn - set the param to the name of the function that should be called when user clicks the link
   *
   * In similar fashion to comp, insert in component's onDestroy:
   * ```ts
   * ToolbarService#menu = undefined
   * ```
   */
  public menu?: { title: string; check?: boolean; icon?: string; fn: string }[]
}
