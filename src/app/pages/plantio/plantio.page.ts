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
  readonly logoError = signal(false);
  readonly selectedBedId = signal(1);

  readonly dailyMission = signal<DailyMission>({
    title: 'Plantar feijao',
    subtitle: 'Missao do dia disponivel agora',
    reward: '+20 XP',
    icon: 'assets/Formata%C3%A7%C3%A3o.png'
  });

  readonly beds = signal<PlantBed[]>([
    {
      id: 1,
      name: 'Canteiro A',
      status: 'Pronto para plantar',
      progress: 0,
      icon: 'assets/Formata%C3%A7%C3%A3o.png'
    },
    {
      id: 2,
      name: 'Canteiro B',
      status: 'Regado recentemente',
      progress: 45,
      icon: 'assets/icone.png'
    },
    {
      id: 3,
      name: 'Canteiro C',
      status: 'Broto crescendo',
      progress: 72,
      icon: 'assets/Home.png'
    }
  ]);

  readonly tools = signal<Tool[]>([
    { id: 1, label: 'Regar', icon: 'assets/icone.png' },
    { id: 2, label: 'Adubar', icon: 'assets/Ranks.png' },
    { id: 3, label: 'Colher', icon: 'assets/Cadastro.png' },
    { id: 4, label: 'Cavar', icon: 'assets/Login.png' }
  ]);

  onLogoError(): void {
    this.logoError.set(true);
  }

  selectBed(id: number): void {
    this.selectedBedId.set(id);
  }

  trackById(_: number, item: PlantBed | Tool): number {
    return item.id;
  }
}

interface DailyMission {
  title: string;
  subtitle: string;
  reward: string;
  icon: string;
}

interface PlantBed {
  id: number;
  name: string;
  status: string;
  progress: number;
  icon: string;
}

interface Tool {
  id: number;
  label: string;
  icon: string;
}
