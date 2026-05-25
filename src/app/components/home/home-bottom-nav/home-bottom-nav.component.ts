import { Component } from '@angular/core';

type NavItem = {
  label: string;
  icon: string;
  route: string;
  exact?: boolean;
};

@Component({
  selector: 'app-home-bottom-nav',
  standalone: false,
  templateUrl: './home-bottom-nav.component.html',
  styleUrls: ['./home-bottom-nav.component.scss']
})
export class HomeBottomNavComponent {
  readonly navItems: NavItem[] = [
    { label: 'Fazenda', icon: 'assets/Home.png', route: '/home', exact: true },
    { label: 'Conquistas', icon: 'assets/Ranks.png', route: '/conquistas', exact: true },
    { label: 'Plantio', icon: 'assets/Formata%C3%A7%C3%A3o.png', route: '/plantio', exact: true },
    { label: 'Mapa', icon: 'assets/Pontos%20de%20entrega.png', route: '/pontos-entrega', exact: true },
    { label: 'Perfil', icon: 'assets/Usuario.png', route: '/usuario', exact: true }
  ];

  trackByLabel(_: number, item: NavItem): string {
    return item.label;
  }
}
