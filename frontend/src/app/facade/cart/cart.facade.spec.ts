import { TestBed } from '@angular/core/testing';

import { CartFacade } from './cart.facade';

describe('CartService', () => {
  let service: CartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
