import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../core/ui/button/button.component';
import { InputComponent } from '../../core/ui/input/input.component';

import { Router } from '@angular/router';
import { AuthService } from '../../api/auth/auth.service';

@Component({
  selector: 'app-login-ecommerce',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './login-ecommerce.component.html',
  styleUrl: './login-ecommerce.component.scss',
})
export class LoginEcommerceComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm = this.fb.group({
    phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
    verificationCode: [''],
  });

  isLoadCode = signal(false);
  code = signal('');

  generateCode() {
    if (this.loginForm.valid) {
      this.isLoadCode.set(true);
      setTimeout(() => {
        this.authService
          .generateCode(this.loginForm.value.phoneNumber || '')
          .subscribe((res) => {
            this.isLoadCode.set(false);
            this.code.set(res.code);
          });
      }, 800);
    } else {
      alert('Formlario invalido');
    }
  }

  verifyCode() {
    const phone = this.loginForm.value.phoneNumber || '';
    const verificationCode = this.loginForm.value.verificationCode || '';

    this.authService.verifyCode(phone, verificationCode).subscribe(() => {
      this.router.navigate(['home']);
    });
  }
}
