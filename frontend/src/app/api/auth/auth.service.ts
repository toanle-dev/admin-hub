import { inject, Injectable } from '@angular/core';
import { ApiBase } from '../api.base';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../core/providers/storage/storage.service';
import { StorageKeys } from '../../core/providers/storage/storage.enum';

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
        this.storage.setItem(StorageKeys.token, res.access_token);
      })
    );
  }

  register(email: string, password: string): Observable<any> {
    return this.post('register', {
      email: email,
      password: password,
    });
  }
}
