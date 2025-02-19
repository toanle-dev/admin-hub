import { inject, Injectable } from '@angular/core';
import { ApiBase } from '../api.base';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../core/providers/storage/storage.service';
import { StorageKeys } from '../../core/providers/storage/storage.enum';
import { VerifyCodeResponse } from './interfaces/verify-code.interface';
import { Role } from './interfaces/role.interface';
import { GenerateCodeResponse } from './interfaces/generate-code.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiBase {
  private readonly storage = inject(StorageService);

  constructor(http: HttpClient) {
    super(http, {
      host: environment.apiUrl + 'auth',
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.post('login', {
      email: email,
      password: password,
    }).pipe(
      tap((res: any) => {
        this.storage.set(StorageKeys.token, res.access_token);
      }),
    );
  }

  register(email: string, password: string): Observable<VerifyCodeResponse> {
    return this.post('register', {
      email: email,
      password: password,
    });
  }

  generateCode(phone: string): Observable<GenerateCodeResponse> {
    return this.post('generate-code', {
      phone: phone,
    });
  }

  verifyCode(phone: string, code: string) {
    return this.post('verify-code', {
      phone: phone,
      code: code,
    }).pipe(
      tap((res: any) => {
        this.storage.set(StorageKeys.token, res.access_token);
      }),
    );
  }

  getRoles(): Observable<Role[]> {
    return this.fetch('roles');
  }
}
