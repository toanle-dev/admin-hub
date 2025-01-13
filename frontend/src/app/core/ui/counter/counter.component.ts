import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  value = model<number>(0);
  change = output<number>();
  negative = input(false);

  incrementValue() {
    this.value.update((value) => value + 1);
    this.change.emit(this.value());
  }

  decrementValue() {
    if (this.value() === 0 && !this.negative()) {
      return;
    }

    this.value.update((value) => value - 1);
    this.change.emit(this.value());
  }
}
