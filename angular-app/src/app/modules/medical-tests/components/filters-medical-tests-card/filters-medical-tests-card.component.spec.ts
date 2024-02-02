import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersMedicalTestsCardComponent } from './filters-medical-tests-card.component';

describe('FiltersMedicalTestsCardComponent', () => {
  let component: FiltersMedicalTestsCardComponent;
  let fixture: ComponentFixture<FiltersMedicalTestsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersMedicalTestsCardComponent]
    });
    fixture = TestBed.createComponent(FiltersMedicalTestsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
