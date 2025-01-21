import { Injectable } from '@angular/core';
import { ToastComponent } from './toast.component';
import { ToastTheme } from './toast.interface';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toast!: ToastComponent;

  create(toast: ToastComponent): ToastService {
    this.toast = toast;
    return this;
  }

  add(message: string, theme: ToastTheme) {
    this.toast.add(message, theme);
  }

  remove(id: string) {
    this.toast.remove(id);
  }
}
