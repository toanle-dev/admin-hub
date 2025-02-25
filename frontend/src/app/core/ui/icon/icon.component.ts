import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { map, of } from 'rxjs';

type Icon =
  | 'user-group'
  | 'inbox-stack'
  | 'tag'
  | 'shopping-bag'
  | 'banknotes'
  | 'x-mark'
  | 'user'
  | 'delivery'
  | 'cart';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  private http = inject(HttpClient);
  private sanitizer = inject(DomSanitizer);

  icon = input<Icon | null>(null);

  source = computed(() => {
    if (!this.icon()) {
      return of('');
    }

    const path = './assets/hero-icon/' + this.icon() + '.svg';
    return this.http.get(path, { responseType: 'text' }).pipe(
      map((svg) => {
        return this.sanitizer.bypassSecurityTrustHtml(svg);
      }),
    );
  });
}
