import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DoctorTodayAppointmentsCalendarComponent } from './doctor-today-appointments-calendar.component';

describe('DoctorTodayAppointmentsCalendarComponent', () => {
  let component: DoctorTodayAppointmentsCalendarComponent;
  let fixture: ComponentFixture<DoctorTodayAppointmentsCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorTodayAppointmentsCalendarComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(DoctorTodayAppointmentsCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
