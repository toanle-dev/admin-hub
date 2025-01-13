import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddressInfo } from './cep.interface';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  private http = inject(HttpClient);

  getAddress(cep: string): Observable<AddressInfo> {
    return this.http.get<AddressInfo>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
