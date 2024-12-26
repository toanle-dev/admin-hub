import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputComponent } from '../../../core/ui/input/input.component';
import { UsersService } from '../../../api/users/users.service';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputComponent],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent {
  private readonly userService = inject(UsersService);
  private readonly fb = inject(FormBuilder);

  id = input.required<number>();

  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    role: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.findOne(this.id()).subscribe((user) => {
      console.log('User', user);
      this.userForm.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role.id,
      });
    });
  }

  cancel() {
    history.back();
  }

  saveUser(): void {
    if (this.userForm.valid) {
      this.userService
        .updateUser(this.id(), {
          email: this.userForm.value.email || '',
          firstName: this.userForm.value.firstName || '',
          lastName: this.userForm.value.lastName || '',
          roleId: Number(this.userForm.value.role),
        })
        .subscribe({
          next: () => {
            history.back();
          },
          error: (err) => {
            console.log('Erro ao salvar usuário', err);
          },
        });
    }
  }
}
