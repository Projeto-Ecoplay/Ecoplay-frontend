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
		path: 'plantio',
		loadComponent: () => import('./pages/plantio/plantio.page').then((m) => m.PlantioPage)
	},
	{
		path: 'conquistas',
		loadComponent: () => import('./pages/ranks/ranks.page').then((m) => m.RanksPage)
	},
	{
		path: 'pontos-entrega',
		loadComponent: () =>
			import('./pages/pontos-entrega/pontos-entrega.page').then((m) => m.PontosEntregaPage)
	},
	{
		path: 'ranks',
		redirectTo: 'conquistas',
		pathMatch: 'full'
	},
	{
		path: 'usuario',
		loadComponent: () => import('./pages/usuario/usuario.page').then((m) => m.UsuarioPage)
	},
	{
		path: '**',
		loadComponent: () => import('./pages/not-found/not-found.page').then((m) => m.NotFoundPage)
	}
];
