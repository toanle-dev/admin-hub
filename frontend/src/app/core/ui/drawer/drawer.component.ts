import {
  Component,
  ElementRef,
  input,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  readonly id = uuidv4();

  private container = viewChild.required('container', {
    read: ViewContainerRef,
  });

  title = input('');
  input = viewChild.required<ElementRef<HTMLInputElement>>('input');

  toggle() {
    this.input().nativeElement.checked = !this.input().nativeElement.checked;
  }

  create<T = any>(component: Type<T>, callback?: (component: T) => void) {
    const componentRef = this.container().createComponent(component);

    if (callback) {
      callback(componentRef.instance);
    }
  }
}
