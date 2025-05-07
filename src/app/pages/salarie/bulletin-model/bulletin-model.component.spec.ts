import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinModelComponent } from './bulletin-model.component';

describe('BulletinModelComponent', () => {
  let component: BulletinModelComponent;
  let fixture: ComponentFixture<BulletinModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BulletinModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulletinModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
