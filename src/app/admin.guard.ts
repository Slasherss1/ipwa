/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject } from '@angular/core'
import { CanActivateChildFn, RedirectCommand, Router } from '@angular/router'
import { LocalStorageService } from './services/local-storage.service'

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  if (inject(LocalStorageService).admin == undefined)
    return new RedirectCommand(router.parseUrl('/'))
  return true
}
