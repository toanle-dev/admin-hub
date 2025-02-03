import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../core/ui/button/button.component';
import { InputComponent } from '../../core/ui/input/input.component';

@Component({
  selector: 'app-login-ecommerce',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './login-ecommerce.component.html',
  styleUrl: './login-ecommerce.component.scss',
})
export class LoginEcommerceComponent {
  loginForm = inject(FormBuilder).group({
    phoneNumber: ['', [Validators.required, Validators.minLength(11)]],
  });

  onSubmit() {
    alert('submit');
  }
}
