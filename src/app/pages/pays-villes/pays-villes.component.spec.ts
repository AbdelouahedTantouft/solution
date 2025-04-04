import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaysVillesComponent } from './pays-villes.component';

describe('PaysVillesComponent', () => {
  let component: PaysVillesComponent;
  let fixture: ComponentFixture<PaysVillesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaysVillesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaysVillesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
