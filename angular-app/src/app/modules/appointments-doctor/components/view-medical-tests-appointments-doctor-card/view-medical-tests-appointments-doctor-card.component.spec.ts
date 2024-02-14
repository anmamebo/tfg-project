import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewMedicalTestsAppointmentsDoctorCardComponent } from './view-medical-tests-appointments-doctor-card.component';

describe('ViewMedicalTestsAppointmentsDoctorCardComponent', () => {
  let component: ViewMedicalTestsAppointmentsDoctorCardComponent;
  let fixture: ComponentFixture<ViewMedicalTestsAppointmentsDoctorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMedicalTestsAppointmentsDoctorCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      ViewMedicalTestsAppointmentsDoctorCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
