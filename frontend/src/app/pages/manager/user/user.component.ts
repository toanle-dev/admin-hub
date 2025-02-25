import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../../api/users/users.service';
import { ButtonComponent } from '../../../core/ui/button/button.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  private readonly router = inject(Router);
  private readonly userService = inject(UsersService);

  users: any[] = [];
  roles: any[] = [];

  ngOnInit(): void {
    this.userService.listUsers().subscribe((res) => {
      this.users = res;
    });
  }

  editUser(userId: number): void {
    this.router.navigate([`/user-edit/${userId}`]);
  }
}
