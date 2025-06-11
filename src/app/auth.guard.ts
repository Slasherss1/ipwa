import { inject } from '@angular/core'
import { CanActivateChildFn, RedirectCommand, Router } from '@angular/router'
import { LocalStorageService } from './services/local-storage.service'

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  if (!inject(LocalStorageService).loggedIn)
    return new RedirectCommand(router.parseUrl('/login'))
  return true
}
