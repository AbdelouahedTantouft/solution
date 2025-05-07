import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalarieFormComponent } from './salarie-form.component';

describe('SalarieFormComponent', () => {
  let component: SalarieFormComponent;
  let fixture: ComponentFixture<SalarieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalarieFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalarieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
