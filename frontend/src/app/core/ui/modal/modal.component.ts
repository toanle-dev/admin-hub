import {
  Component,
  ElementRef,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  private container = viewChild.required('container', {
    read: ViewContainerRef,
  });

  modal = viewChild.required<ElementRef<any>>('modal');

  create<T = any>(instance: Type<T>, callback?: (ref: T) => void) {
    // Limpa o container antes de criar um novo componente (opcional)
    this.container().clear();

    // Cria o componente dinâmico
    const componentRef = this.container().createComponent(instance);

    if (callback) {
      callback(componentRef.instance);
    }

    this.open();
  }

  close() {
    this.modal().nativeElement.close();
  }

  open() {
    this.modal().nativeElement.showModal();
  }
}
