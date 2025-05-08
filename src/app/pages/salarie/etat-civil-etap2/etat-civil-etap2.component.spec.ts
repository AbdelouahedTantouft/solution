import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatCivilEtap2Component } from './etat-civil-etap2.component';

describe('EtatCivilEtap2Component', () => {
  let component: EtatCivilEtap2Component;
  let fixture: ComponentFixture<EtatCivilEtap2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatCivilEtap2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatCivilEtap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
