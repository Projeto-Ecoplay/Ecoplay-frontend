import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HomeComponentsModule } from '../../components/home/home-components.module';

@Component({
  selector: 'app-usuario-page',
  standalone: true,
  imports: [CommonModule, HomeComponentsModule],
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioPage {
  private readonly router = inject(Router);

  readonly profile = signal<UserProfile>({
    id: 1,
    name: 'Lucas',
    email: 'lucas2018@gmail.com',
    password: '1234567890',
    levelTitle: 'Jardineiro Iniciante',
    avatar: 'assets/login-img.png',
    xpCurrent: 15,
    xpTotal: 30,
    sproutCount: 2,
    achievements: [
      { id: 1, title: 'Primeira muda', icon: 'assets/icone.png', unlocked: true },
      { id: 2, title: 'Ciclo verde', icon: 'assets/Ranks.png', unlocked: true },
      { id: 3, title: 'Caixa magica', icon: 'assets/Cadastro.png', unlocked: true },
      { id: 4, title: 'Nova conquista', icon: '', unlocked: false, isAdd: true }
    ]
  });

  readonly form = signal<ProfileForm>({
    name: this.profile().name,
    email: this.profile().email,
    password: this.profile().password
  });

  private readonly initialForm = signal<ProfileForm>({ ...this.form() });

  readonly isDirty = computed(() => {
    const current = this.form();
    const initial = this.initialForm();
    return (
      current.name !== initial.name ||
      current.email !== initial.email ||
      current.password !== initial.password
    );
  });

  readonly progressPercent = computed(() => {
    const profile = this.profile();
    if (!profile.xpTotal) {
      return 0;
    }
    return Math.min(100, Math.round((profile.xpCurrent / profile.xpTotal) * 100));
  });

  readonly seedSlots = computed(() => {
    const totalSeeds = 10;
    const filled = Math.round((this.progressPercent() / 100) * totalSeeds);
    return Array.from({ length: totalSeeds }, (_, index) => ({
      id: index + 1,
      filled: index < filled
    }));
  });

  readonly sprouts = computed(() =>
    Array.from({ length: this.profile().sproutCount }, (_, index) => index)
  );

  readonly achievements = computed(() => this.profile().achievements);

  updateField(field: keyof ProfileForm, value: string): void {
    this.form.update((current) => ({ ...current, [field]: value }));
  }

  save(): void {
    const updated = this.form();
    this.profile.update((current) => ({
      ...current,
      name: updated.name,
      email: updated.email,
      password: updated.password
    }));
    this.initialForm.set({ ...updated });
  }

  logout(): void {
    this.router.navigateByUrl('/login');
  }

  trackById(_: number, item: SeedSlot | Achievement): number {
    return item.id;
  }

  trackByIndex(index: number): number {
    return index;
  }
}

interface SeedSlot {
  id: number;
  filled: boolean;
}

interface Achievement {
  id: number;
  title: string;
  icon: string;
  unlocked: boolean;
  isAdd?: boolean;
}

interface UserProfile {
  id: number;
  name: string;
  email: string;
  password: string;
  levelTitle: string;
  avatar: string;
  xpCurrent: number;
  xpTotal: number;
  sproutCount: number;
  achievements: Achievement[];
}

interface ProfileForm {
  name: string;
  email: string;
  password: string;
}
