import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.page.html',
  styleUrl: './register.page.scss'
})
export class RegisterPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly registerForm = this.formBuilder.group(
    {
      name: ['', Validators.required],
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: [this.passwordMatchValidator] }
  );

  private passwordMatchValidator(control: AbstractControl): { passwordMismatch: true } | null {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
  }

  submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.showError();
      return;
    }

    this.router.navigateByUrl('/login');
  }

  openBirthdatePicker(input: HTMLInputElement): void {
    const picker = input as HTMLInputElement & { showPicker?: () => void };

    if (picker.showPicker) {
      picker.showPicker();
      return;
    }

    input.focus();
    input.click();
  }

  private showError(): void {
    const nameControl = this.registerForm.get('name');
    const birthControl = this.registerForm.get('birthdate');
    const emailControl = this.registerForm.get('email');
    const passwordControl = this.registerForm.get('password');
    const confirmControl = this.registerForm.get('confirmPassword');
    let message = 'Preencha todos os campos para continuar.';

    if (this.registerForm.errors?.['passwordMismatch']) {
      message = 'As senhas nao conferem. Tente novamente.';
    } else if (passwordControl?.hasError('minlength')) {
      message = 'Sua senha precisa ter pelo menos 6 caracteres.';
    } else if (emailControl?.hasError('email')) {
      message = 'Digite um email valido para continuar.';
    } else if (nameControl?.hasError('required')) {
      message = 'Informe seu nome para continuar.';
    } else if (birthControl?.hasError('required')) {
      message = 'Informe sua data de nascimento para continuar.';
    } else if (confirmControl?.hasError('required')) {
      message = 'Confirme sua senha para continuar.';
    }

    void Swal.fire({
      icon: 'error',
      title: 'Vamos completar sua horta',
      text: message,
      confirmButtonText: 'Entendi',
      buttonsStyling: false,
      customClass: {
        popup: 'agro-swal',
        title: 'agro-swal-title',
        htmlContainer: 'agro-swal-text',
        confirmButton: 'agro-swal-confirm',
        icon: 'agro-swal-icon'
      }
    });
  }
}
