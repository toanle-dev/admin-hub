import {
  Component,
  ComponentRef,
  ElementRef,
  Type,
  viewChild,
  ViewContainerRef,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { DrawerCommand } from './drawer.interface';

@Component({
  selector: 'app-drawer',
  standalone: true,
  imports: [],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.scss',
})
export class DrawerComponent {
  readonly id = uuidv4();
  input = viewChild.required<ElementRef<HTMLInputElement>>('input');

  private container = viewChild.required('container', {
    read: ViewContainerRef,
  });

  // Pilha de histórico
  private history: Array<{
    componentRef: ComponentRef<any>;
    viewIndex: number;
  }> = [];

  create<T = any>(
    component: Type<T>,
    callback?: (component: T) => void
  ): DrawerCommand {
    // Desanexar a view atual e salvar no histórico
    if (this.container().length > 0) {
      const currentView = this.container().detach(0);
      if (currentView) {
        const lastComponent = this.history[this.history.length - 1];
        if (lastComponent) {
          lastComponent.viewIndex = this.history.length - 1;
        }
      }
    }

    // Remove qualquer conteúdo existente
    this.container().clear();

    // Cria o componente
    const componentRef = this.container().createComponent(component);

    // Adicionar ao histórico
    this.history.push({ componentRef, viewIndex: this.history.length });

    // Chama o callback, se fornecido
    if (callback) {
      callback(componentRef.instance);
    }

    // Retorna o comando de controle
    return {
      toggle: () => this.toggle(),
      goBack: () => this.goBack(),
    };
  }

  private toggle() {
    this.input().nativeElement.checked = !this.input().nativeElement.checked;
  }

  private goBack() {
    if (this.history.length > 1) {
      // Remover o último estado do histórico
      const lastState = this.history.pop();
      if (lastState) {
        // Desanexar a view atual
        this.container().detach(0);

        // Recuperar o estado anterior
        const previousState = this.history[this.history.length - 1];
        this.container().insert(previousState.componentRef.hostView);
      }
    }
  }
}
