import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsHistoricalPatientPageComponent } from './appointments-historical-patient-page.component';

describe('AppointmentsHistoricalPatientPageComponent', () => {
  let component: AppointmentsHistoricalPatientPageComponent;
  let fixture: ComponentFixture<AppointmentsHistoricalPatientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsHistoricalPatientPageComponent]
    });
    fixture = TestBed.createComponent(AppointmentsHistoricalPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
