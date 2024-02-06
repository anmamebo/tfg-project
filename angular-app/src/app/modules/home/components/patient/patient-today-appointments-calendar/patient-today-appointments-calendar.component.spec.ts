import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientTodayAppointmentsCalendarComponent } from './patient-today-appointments-calendar.component';

describe('PatientTodayAppointmentsCalendarComponent', () => {
  let component: PatientTodayAppointmentsCalendarComponent;
  let fixture: ComponentFixture<PatientTodayAppointmentsCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientTodayAppointmentsCalendarComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      PatientTodayAppointmentsCalendarComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
