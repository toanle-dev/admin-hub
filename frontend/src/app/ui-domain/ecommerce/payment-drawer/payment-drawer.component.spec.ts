import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDrawerComponent } from './payment-drawer.component';

describe('PaymentDrawerComponent', () => {
  let component: PaymentDrawerComponent;
  let fixture: ComponentFixture<PaymentDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
