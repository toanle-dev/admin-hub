import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrdersDeliveryComponent } from './card-orders-delivery.component';

describe('CardOrdersDeliveryComponent', () => {
  let component: CardOrdersDeliveryComponent;
  let fixture: ComponentFixture<CardOrdersDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardOrdersDeliveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardOrdersDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
