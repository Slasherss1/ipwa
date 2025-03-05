import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  if (!inject(LocalStorageService).loggedIn) return router.parseUrl('/login')
  return true
};
