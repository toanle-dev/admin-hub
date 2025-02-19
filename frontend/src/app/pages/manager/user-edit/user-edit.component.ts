import { CommonModule } from '@angular/common';
import { Component, inject, input, OnDestroy, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { InputComponent } from '../../../core/ui/input/input.component';
import { UsersService } from '../../../api/users/users.service';
import { AuthService } from '../../../api/auth/auth.service';
import { SelectComponent } from '../../../core/ui/select/select.component';
import { SelectOption } from '../../../core/ui/select/select.interface';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
  ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent implements OnDestroy {
  private readonly userService = inject(UsersService);
  private readonly authService = inject(AuthService);
  private readonly fb = inject(FormBuilder);
  private subscriptions: Subscription = new Subscription();

  id = input.required<number>();

  userForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    role: ['', Validators.required],
  });

  roleList = signal<SelectOption[]>([]);

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  loadData(): void {
    // Get user
    this.subscriptions.add(
      this.userService.findOne(this.id()).subscribe((user) => {
        // List roles
        this.subscriptions.add(
          this.authService.getRoles().subscribe((roles) => {
            // Set roles
            this.roleList.set(
              roles.map((role) => {
                return {
                  value: String(role.id),
                  label: role.name,
                } as SelectOption;
              }),
            );

            // Create FormBuilder
            this.userForm.reset({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role.id,
            });
          }),
        );
      }),
    );
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
