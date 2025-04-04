import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualTreatmentComponent } from './annual-treatment.component';

describe('AnnualTreatmentComponent', () => {
  let component: AnnualTreatmentComponent;
  let fixture: ComponentFixture<AnnualTreatmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualTreatmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnualTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
