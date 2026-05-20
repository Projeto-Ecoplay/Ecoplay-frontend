import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'login'
	},
	{
		path: '',
		loadChildren: () => import('./pages/auth/auth.routes').then((m) => m.authRoutes)
	},
	{
		path: 'home',
		loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage)
	},
	{
		path: '**',
		loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage)
	}
];
