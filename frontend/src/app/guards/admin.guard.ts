import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { SaveUser } from "../services/SaveUser.service";

export const adminGuard = () => {
  const saveUser = inject(SaveUser);
  const router = inject(Router);

  const currentUser = saveUser.currentUserValue;
  if (currentUser && currentUser.role === 'ADMIN') {
    return true;
  }

  router.navigate(['/']); // Redirige vers la page d'accueil si l'utilisateur n'est pas ADMIN
  return false;
};
