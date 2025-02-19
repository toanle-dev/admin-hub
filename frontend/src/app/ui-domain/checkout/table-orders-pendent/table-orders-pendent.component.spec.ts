import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOrdersPendentComponent } from './table-orders-pendent.component';

describe('TableOrdersComponent', () => {
  let component: TableOrdersPendentComponent;
  let fixture: ComponentFixture<TableOrdersPendentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableOrdersPendentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableOrdersPendentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
