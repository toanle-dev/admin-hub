import { Injectable } from '@angular/core';
import { StorageKeys } from './storage.enum';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getItem(key: StorageKeys): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: StorageKeys, value: string) {
    localStorage.setItem(key, value);
  }
}
