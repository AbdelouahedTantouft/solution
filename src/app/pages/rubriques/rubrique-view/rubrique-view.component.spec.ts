import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubriqueViewComponent } from './rubrique-view.component';

describe('RubriqueViewComponent', () => {
  let component: RubriqueViewComponent;
  let fixture: ComponentFixture<RubriqueViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RubriqueViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RubriqueViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
