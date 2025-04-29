import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollEditionComponent } from './payroll-edition.component';

describe('PayrollEditionComponent', () => {
  let component: PayrollEditionComponent;
  let fixture: ComponentFixture<PayrollEditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayrollEditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
