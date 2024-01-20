import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FiltersTreatmentsPatientCardComponent } from './filters-treatments-patient-card.component';

describe('FiltersTreatmentsPatientCardComponent', () => {
  let component: FiltersTreatmentsPatientCardComponent;
  let fixture: ComponentFixture<FiltersTreatmentsPatientCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersTreatmentsPatientCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(FiltersTreatmentsPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
