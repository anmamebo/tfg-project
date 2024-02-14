import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewPatientAppointmentsDoctorCardComponent } from './view-patient-appointments-doctor-card.component';

describe('ViewPatientAppointmentsDoctorCardComponent', () => {
  let component: ViewPatientAppointmentsDoctorCardComponent;
  let fixture: ComponentFixture<ViewPatientAppointmentsDoctorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewPatientAppointmentsDoctorCardComponent],
    });
    fixture = TestBed.createComponent(
      ViewPatientAppointmentsDoctorCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
