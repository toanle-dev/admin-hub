import { CommonModule } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { ToastTheme } from './toast.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  theme = signal<ToastTheme>('info');
  messages: { id: string; text: string }[] = [];

  add(text: string, theme = 'info' as ToastTheme) {
    this.theme.set(theme);
    const id = uuidv4();
    this.messages.push({
      id,
      text,
    });
    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: string) {
    this.messages = this.messages.filter((msg) => msg.id !== id);
  }
}
