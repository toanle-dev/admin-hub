import { Type } from '@angular/core';

export interface DrawerCommand {
  toggle(): void;
  goBack(): void;
}
