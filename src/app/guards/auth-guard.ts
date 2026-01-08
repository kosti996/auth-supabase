import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SupabaseService } from '../services/supabase';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(SupabaseService);
  return authService.isAuthenticated();
};
