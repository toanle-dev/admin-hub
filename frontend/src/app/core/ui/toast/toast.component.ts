import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ToastTheme } from './toast.interface';

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

  add(text: string, theme = 'info' as ToastTheme, time: number = 3000) {
    this.theme.set(theme);
    const id = uuidv4();
    this.messages.push({
      id,
      text,
    });
    setTimeout(() => this.remove(id), time);
  }

  remove(id: string) {
    this.messages = this.messages.filter((msg) => msg.id !== id);
  }
}
