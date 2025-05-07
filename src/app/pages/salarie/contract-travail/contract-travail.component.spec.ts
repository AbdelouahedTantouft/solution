import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractTravailComponent } from './contract-travail.component';

describe('ContractTravailComponent', () => {
  let component: ContractTravailComponent;
  let fixture: ComponentFixture<ContractTravailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractTravailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractTravailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
