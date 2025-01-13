import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartProductViewComponent } from './cart-product-view.component';

describe('CartProductViewComponent', () => {
  let component: CartProductViewComponent;
  let fixture: ComponentFixture<CartProductViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartProductViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartProductViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
