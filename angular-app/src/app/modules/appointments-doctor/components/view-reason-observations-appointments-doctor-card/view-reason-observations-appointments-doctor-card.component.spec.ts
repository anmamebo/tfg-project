import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewReasonObservationsAppointmentsDoctorCardComponent } from './view-reason-observations-appointments-doctor-card.component';

describe('ViewReasonObservationsAppointmentsDoctorCardComponent', () => {
  let component: ViewReasonObservationsAppointmentsDoctorCardComponent;
  let fixture: ComponentFixture<ViewReasonObservationsAppointmentsDoctorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReasonObservationsAppointmentsDoctorCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      ViewReasonObservationsAppointmentsDoctorCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
