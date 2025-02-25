import { AfterViewInit, Component, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from '../../../core/ui/modal/modal.component';
import { ModalService } from '../../../core/ui/modal/modal.service';
import { NavBarComponent } from '../../../ui-domain/manager/nav-bar/nav-bar.component';

@Component({
  selector: 'app-checkout-container',
  standalone: true,
  imports: [RouterOutlet, ModalComponent, NavBarComponent],
  templateUrl: './checkout-container.component.html',
  styleUrl: './checkout-container.component.scss',
})
export class CheckoutContainerComponent implements AfterViewInit {
  private modalService = inject(ModalService);
  private modal = viewChild.required<ModalComponent>('modal');

  ngAfterViewInit(): void {
    this.modalService.create(this.modal());
  }
}
