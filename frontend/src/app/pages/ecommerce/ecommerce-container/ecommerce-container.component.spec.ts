import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommerceContainerComponent } from './ecommerce-container.component';

describe('EcommerceContainerComponent', () => {
  let component: EcommerceContainerComponent;
  let fixture: ComponentFixture<EcommerceContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EcommerceContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EcommerceContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
