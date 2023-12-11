import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTreatmentsHistoricalPatientCardComponent } from './list-treatments-historical-patient-card.component';

describe('ListTreatmentsHistoricalPatientCardComponent', () => {
  let component: ListTreatmentsHistoricalPatientCardComponent;
  let fixture: ComponentFixture<ListTreatmentsHistoricalPatientCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTreatmentsHistoricalPatientCardComponent]
    });
    fixture = TestBed.createComponent(ListTreatmentsHistoricalPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
