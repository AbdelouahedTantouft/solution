import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatCivilComponent } from './etat-civil.component';

describe('EtatCivilComponent', () => {
  let component: EtatCivilComponent;
  let fixture: ComponentFixture<EtatCivilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatCivilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatCivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
