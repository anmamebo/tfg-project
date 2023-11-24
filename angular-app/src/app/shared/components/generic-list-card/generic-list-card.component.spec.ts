import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericListCardComponent } from './generic-list-card.component';

describe('GenericListCardComponent', () => {
  let component: GenericListCardComponent;
  let fixture: ComponentFixture<GenericListCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericListCardComponent]
    });
    fixture = TestBed.createComponent(GenericListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
