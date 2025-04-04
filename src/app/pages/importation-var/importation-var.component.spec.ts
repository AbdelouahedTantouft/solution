import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportationVarComponent } from './importation-var.component';

describe('ImportationVarComponent', () => {
  let component: ImportationVarComponent;
  let fixture: ComponentFixture<ImportationVarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportationVarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportationVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
