import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { LocalStorageService } from './services/local-storage.service';

export const adminGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  if (inject(LocalStorageService).admin == undefined) return router.parseUrl('/')
  return true
};
