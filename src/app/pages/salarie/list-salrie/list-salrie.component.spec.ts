import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSalrieComponent } from './list-salrie.component';

describe('ListSalrieComponent', () => {
  let component: ListSalrieComponent;
  let fixture: ComponentFixture<ListSalrieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSalrieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSalrieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
