import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SaveUser } from '../services/SaveUser.service';

export const authGuard = () => {
  const saveUser = inject(SaveUser);
  const router = inject(Router);

  if (saveUser.currentUserValue === null) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
