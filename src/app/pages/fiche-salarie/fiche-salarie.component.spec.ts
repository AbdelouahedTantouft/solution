import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSalarieComponent } from './fiche-salarie.component';

describe('FicheSalarieComponent', () => {
  let component: FicheSalarieComponent;
  let fixture: ComponentFixture<FicheSalarieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FicheSalarieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FicheSalarieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
