import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppointmentsCalendarPatientPageComponent } from './appointments-calendar-patient-page.component';

describe('AppointmentsCalendarPatientPageComponent', () => {
  let component: AppointmentsCalendarPatientPageComponent;
  let fixture: ComponentFixture<AppointmentsCalendarPatientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsCalendarPatientPageComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(AppointmentsCalendarPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
