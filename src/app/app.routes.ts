import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { NotFound } from './components/not-found/not-found';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [{
    path: 'app',
    component: Home,
    canActivate: [authGuard],
}, {
    path: '**',
    component: NotFound,
}];
