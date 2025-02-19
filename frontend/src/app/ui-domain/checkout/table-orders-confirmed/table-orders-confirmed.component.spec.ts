import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOrdersConfirmedComponent } from './table-orders-confirmed.component';

describe('TableOrdersConfirmedComponent', () => {
  let component: TableOrdersConfirmedComponent;
  let fixture: ComponentFixture<TableOrdersConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOrdersConfirmedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableOrdersConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
