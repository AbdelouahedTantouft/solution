import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrametrageComptesComponent } from './prametrage-comptes.component';

describe('PrametrageComptesComponent', () => {
  let component: PrametrageComptesComponent;
  let fixture: ComponentFixture<PrametrageComptesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrametrageComptesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrametrageComptesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
