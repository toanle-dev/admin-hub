import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './go-back.component.html',
  styleUrl: './go-back.component.scss',
})
export class GoBackComponent {
  goBack() {
    history.back();
  }
}
