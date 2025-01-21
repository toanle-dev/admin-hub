import { Injectable, Type, ViewContainerRef } from '@angular/core';
import { DrawerComponent } from './drawer.component';
import { DrawerCommand } from './drawer.interface';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private drawer!: DrawerComponent;
  command!: DrawerCommand;

  create(drawer: DrawerComponent): DrawerService {
    this.drawer = drawer;
    return this;
  }

  set<T = any>(
    component: Type<T>,
    callback?: (component: T) => void
  ): DrawerCommand {
    return (this.command = this.drawer.create(component, callback));
  }
}
