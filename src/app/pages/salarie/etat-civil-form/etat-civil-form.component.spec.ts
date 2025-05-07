import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatCivilFormComponent } from './etat-civil-form.component';

describe('EtatCivilFormComponent', () => {
  let component: EtatCivilFormComponent;
  let fixture: ComponentFixture<EtatCivilFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatCivilFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatCivilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
