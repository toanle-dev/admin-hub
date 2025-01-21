import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutContainerComponent } from './checkout-container.component';

describe('CheckoutContainerComponent', () => {
  let component: CheckoutContainerComponent;
  let fixture: ComponentFixture<CheckoutContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckoutContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
