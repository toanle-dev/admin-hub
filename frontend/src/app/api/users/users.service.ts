import { Injectable } from '@angular/core';
import { ApiBase } from '../api.base';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateUser } from './interfaces/create-user.interface';
import { Observable } from 'rxjs';
import { UpdateUser } from './interfaces/update-user.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends ApiBase {
  constructor(http: HttpClient) {
    super(http, {
      host: environment.apiUrl + 'users',
    });
  }

  createUser(user: CreateUser): Observable<any> {
    return this.post('', user);
  }

  listUsers(): Observable<any> {
    return this.fetch('');
  }

  findOne(userId: number): Observable<any> {
    return this.fetch(String(userId));
  }

  updateUser(userId: number, user: Partial<UpdateUser>): Observable<any> {
    return this.partialUpdate(String(userId), user);
  }

  deleteUser(userId: string): Observable<any> {
    return this.delete(userId);
  }
}
