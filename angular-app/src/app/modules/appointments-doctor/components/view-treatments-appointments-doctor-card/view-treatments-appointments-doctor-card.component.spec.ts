import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTreatmentsAppointmentsDoctorCardComponent } from './view-treatments-appointments-doctor-card.component';

describe('ViewTreatmentsAppointmentsDoctorCardComponent', () => {
  let component: ViewTreatmentsAppointmentsDoctorCardComponent;
  let fixture: ComponentFixture<ViewTreatmentsAppointmentsDoctorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTreatmentsAppointmentsDoctorCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      ViewTreatmentsAppointmentsDoctorCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
