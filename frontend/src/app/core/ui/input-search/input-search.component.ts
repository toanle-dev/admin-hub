import { Component, output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [],
  templateUrl: './input-search.component.html',
  styleUrl: './input-search.component.scss',
})
export class InputSearchComponent {
  keypress = output<KeyboardEvent>();
  keydown = output<KeyboardEvent>();
  input = output<Event>();
}
