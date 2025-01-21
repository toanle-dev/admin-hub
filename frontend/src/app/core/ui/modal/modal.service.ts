import { Injectable, Type, ViewContainerRef } from '@angular/core';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modal!: ModalComponent;

  create(modal: ModalComponent): ModalService {
    this.modal = modal;
    return this;
  }

  open<T = any>(component: Type<T>, callback?: (component: T) => void) {
    return this.modal.create(component, callback);
  }

  close() {
    this.modal.close();
  }
}
