import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationsSocailsFormComponent } from './organizations-socails-form.component';

describe('OrganizationsSocailsFormComponent', () => {
  let component: OrganizationsSocailsFormComponent;
  let fixture: ComponentFixture<OrganizationsSocailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationsSocailsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationsSocailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
