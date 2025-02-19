import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../core/ui/button/button.component';
import { InputComponent } from '../../core/ui/input/input.component';
import { AuthService } from '../../api/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  loginForm = this.fb.group({
    email: ['toan.rle@outlook.com', [Validators.required, Validators.email]],
    password: ['123', [Validators.required]],
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.auth
      .login(
        this.loginForm.value.email || '',
        this.loginForm.value.password || '',
      )
      .subscribe({
        next: () => {
          this.router.navigate(['user-management']);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
