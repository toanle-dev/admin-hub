import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEcommerceComponent } from './login-ecommerce.component';

describe('LoginEcommerceComponent', () => {
  let component: LoginEcommerceComponent;
  let fixture: ComponentFixture<LoginEcommerceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginEcommerceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEcommerceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
