import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HomeComponentsModule } from '../../components/home/home-components.module';

@Component({
  selector: 'app-ranks-page',
  standalone: true,
  imports: [CommonModule, HomeComponentsModule],
  templateUrl: './ranks.page.html',
  styleUrls: ['./ranks.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RanksPage {
  readonly podium = signal<PodiumEntry[]>([
    {
      id: 1,
      rank: 1,
      name: 'Julia',
      subtitle: 'Amorim',
      xp: 9000,
      position: 'first',
      avatar: 'assets/login-img.png'
    },
    {
      id: 2,
      rank: 2,
      name: 'Mariana',
      subtitle: 'Plantadora',
      xp: 8020,
      position: 'second',
      avatar: 'assets/cadastro-img.png'
    },
    {
      id: 3,
      rank: 3,
      name: 'Andre',
      subtitle: 'Andrade',
      xp: 7925,
      position: 'third',
      avatar: 'assets/Usuario.png'
    }
  ]);

  readonly ranks = signal<RankEntry[]>([
    { id: 4, rank: 4, name: 'Luan Cardoso', xp: 3405, avatar: 'assets/Home.png' },
    { id: 5, rank: 5, name: 'Jefferson Nonato', xp: 2000, avatar: 'assets/Login.png' },
    { id: 6, rank: 6, name: 'Janaina Coelho', xp: 1999, avatar: 'assets/Cadastro.png' },
    { id: 7, rank: 7, name: 'Ruizao agricultor', xp: 1500, avatar: 'assets/icone.png' },
    { id: 8, rank: 8, name: 'Lucas', xp: 1000, avatar: 'assets/Ranks.png', highlight: true }
  ]);

  trackById(_: number, item: PodiumEntry | RankEntry): number {
    return item.id;
  }
}

interface PodiumEntry {
  id: number;
  rank: number;
  name: string;
  subtitle: string;
  xp: number;
  position: 'first' | 'second' | 'third';
  avatar: string;
}

interface RankEntry {
  id: number;
  rank: number;
  name: string;
  xp: number;
  avatar: string;
  highlight?: boolean;
}
