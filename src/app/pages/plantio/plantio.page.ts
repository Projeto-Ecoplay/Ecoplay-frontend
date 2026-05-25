import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HomeComponentsModule } from '../../components/home/home-components.module';

@Component({
  selector: 'app-plantio-page',
  standalone: true,
  imports: [CommonModule, HomeComponentsModule],
  templateUrl: './plantio.page.html',
  styleUrls: ['./plantio.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlantioPage {
  readonly missions = signal<Mission[]>([
    {
      id: 1,
      title: 'Plante uma &Aacute;rvore',
      subtitle: 'Plante uma &aacute;rvore em sua casa',
      progress: 0,
      progressLabel: '0/1',
      xp: 450,
      icon: 'assets/icon/platar.svg',
      alt: 'Icone de plantio',
      accent: '#8bd07a'
    },
    {
      id: 2,
      title: 'Regue as Plantas',
      subtitle: 'Regue as plantas da horta 3 vezes',
      progress: 33,
      progressLabel: '1/3',
      xp: 250,
      icon: 'assets/icon/missoes.svg',
      alt: 'Icone de rega',
      accent: '#f0cf74'
    },
    {
      id: 3,
      title: 'Colha Vegetais',
      subtitle: 'Colha 5 vegetais na horta',
      progress: 60,
      progressLabel: '3/5',
      xp: 350,
      icon: 'assets/icon/pontos.svg',
      alt: 'Icone de colheita',
      accent: '#d98a73'
    }
  ]);

  readonly score = signal<Score>({
    level: 1,
    name: 'Lucas',
    total: 1000,
    avatar: 'assets/Usuario.png'
  });

  trackById(_: number, item: Mission): number {
    return item.id;
  }
}

interface Mission {
  id: number;
  title: string;
  subtitle: string;
  progress: number;
  progressLabel: string;
  xp: number;
  icon: string;
  alt: string;
  accent: string;
}

interface Score {
  level: number;
  name: string;
  total: number;
  avatar: string;
}
