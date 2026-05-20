import { Component } from '@angular/core';

type NavItem = {
  label: string;
  icon: string;
  active?: boolean;
};

@Component({
  selector: 'app-home-bottom-nav',
  standalone: false,
  templateUrl: './home-bottom-nav.component.html',
  styleUrls: ['./home-bottom-nav.component.scss']
})
export class HomeBottomNavComponent {
  readonly navItems: NavItem[] = [
    { label: 'Inicio', icon: 'assets/icone.png', active: true },
    { label: 'Rank', icon: 'assets/Ranks.png' },
    { label: 'Plantar', icon: 'assets/Formata%C3%A7%C3%A3o.png' },
    { label: 'Mapa', icon: 'assets/Pontos%20de%20entrega.png' },
    { label: 'Perfil', icon: 'assets/Usuario.png' }
  ];
}
