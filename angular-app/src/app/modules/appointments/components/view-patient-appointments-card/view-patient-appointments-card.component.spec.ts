import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPatientAppointmentsCardComponent } from './view-patient-appointments-card.component';

describe('ViewPatientAppointmentsCardComponent', () => {
  let component: ViewPatientAppointmentsCardComponent;
  let fixture: ComponentFixture<ViewPatientAppointmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPatientAppointmentsCardComponent],
    });
    fixture = TestBed.createComponent(ViewPatientAppointmentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
