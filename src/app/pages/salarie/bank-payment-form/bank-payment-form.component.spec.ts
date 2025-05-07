import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankPaymentFormComponent } from './bank-payment-form.component';

describe('BankPaymentFormComponent', () => {
  let component: BankPaymentFormComponent;
  let fixture: ComponentFixture<BankPaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankPaymentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankPaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
