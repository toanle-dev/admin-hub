import { Injectable } from '@angular/core';
import { StorageKeys } from './storage.enum';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  get(key: StorageKeys): string | null {
    return localStorage.getItem(key);
  }

  set(key: StorageKeys, value: string) {
    localStorage.setItem(key, value);
  }

  remove(key: StorageKeys) {
    localStorage.removeItem(key);
  }
}
