import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { HomeComponentsModule } from '../../components/home/home-components.module';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HomeComponentsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  private readonly destroyRef = inject(DestroyRef);

  readonly logoError = signal(false);
  readonly xpCurrent = signal(15);
  readonly xpTotal = signal(30);
  readonly xpPercent = computed(() => {
    const total = this.xpTotal();
    if (total <= 0) {
      return 0;
    }
    return Math.min(100, Math.round((this.xpCurrent() / total) * 100));
  });

  readonly nextActionSeconds = signal(2 * 3600 + 50 * 60 + 30);
  readonly nextActionLabel = computed(() => this.formatTime(this.nextActionSeconds()));

  readonly missions = signal<Mission[]>([
    { id: 1, title: 'Moeda', icon: 'coin', completed: true, current: false, locked: false },
    { id: 2, title: 'Regar', icon: 'water', completed: true, current: false, locked: false },
    { id: 3, title: 'Planta', icon: 'plant', completed: true, current: false, locked: false },
    { id: 4, title: 'Cavar', icon: 'dig', completed: true, current: false, locked: false },
    { id: 5, title: 'Carrinho', icon: 'cart', completed: false, current: false, locked: true },
    { id: 6, title: 'Adubo', icon: 'fertilizer', completed: false, current: false, locked: true },
    { id: 7, title: 'Semente', icon: 'seed', completed: false, current: true, locked: false }
  ]);

  readonly ctaTop = computed(() => {
    const missions = this.missions();
    const currentIndex = missions.findIndex((mission) => mission.current);
    const index = currentIndex >= 0 ? currentIndex : 0;
    return Math.max(8, this.nodeTop(index) - 8);
  });

  constructor() {
    const timer = setInterval(() => {
      this.nextActionSeconds.update((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    this.destroyRef.onDestroy(() => clearInterval(timer));
  }

  onLogoError(): void {
    this.logoError.set(true);
  }

  trackById(_: number, mission: Mission): number {
    return mission.id;
  }

  nodeTop(index: number): number {
    const positions = [10, 23, 37, 51, 66, 79, 92];
    return positions[Math.min(index, positions.length - 1)];
  }

  isRight(index: number): boolean {
    return index % 2 === 1;
  }

  private formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
  }
}

interface Mission {
  id: number;
  title: string;
  icon: string;
  completed: boolean;
  current: boolean;
  locked: boolean;
}
