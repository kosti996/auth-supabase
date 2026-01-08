import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './components/auth/auth';
import { Account } from './components/account/account';
import { SupabaseService } from './services/supabase';

const authGuard = async () => {
	const supabase = inject(SupabaseService)
	const router = inject(Router)
	const session = await supabase.getSession()
	if (session) return true
	return router.parseUrl('/')
}

export const routes: Routes = [
	{ path: '', component: Auth },
	{ path: 'app', component: Account, canActivate: [authGuard] },
]
