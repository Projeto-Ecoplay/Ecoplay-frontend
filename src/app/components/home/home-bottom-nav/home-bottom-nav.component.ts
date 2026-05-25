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
    { label: 'Fazenda', icon: 'assets/icon/home.svg', route: '/home', exact: true },
    { label: 'Conquistas', icon: 'assets/icon/missoes.svg', route: '/conquistas', exact: true },
    { label: 'Plantio', icon: 'assets/icon/platar.svg', route: '/plantio', exact: true },
    { label: 'Pontos', icon: 'assets/icon/pontos.svg', route: '/pontos-entrega', exact: true },
    { label: 'Perfil', icon: 'assets/icon/user.svg', route: '/usuario', exact: true }
  ];

  trackByLabel(_: number, item: NavItem): string {
    return item.label;
  }
}
