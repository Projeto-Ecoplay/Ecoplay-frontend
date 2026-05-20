import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss'
})
export class LoginPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.showError();
      return;
    }

    this.router.navigateByUrl('/home');
  }

  private showError(): void {
    const emailControl = this.loginForm.get('email');
    const passwordControl = this.loginForm.get('password');
    let message = 'Preencha seu email e sua senha para continuar.';

    if (emailControl?.hasError('email')) {
      message = 'Digite um email valido para continuar.';
    } else if (emailControl?.hasError('required')) {
      message = 'Informe seu email para continuar.';
    } else if (passwordControl?.hasError('required')) {
      message = 'Digite sua senha para continuar.';
    }

    void Swal.fire({
      icon: 'error',
      title: 'Ops, algo ficou faltando',
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
