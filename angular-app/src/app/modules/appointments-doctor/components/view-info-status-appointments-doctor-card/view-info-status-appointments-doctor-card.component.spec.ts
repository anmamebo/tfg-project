import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewInfoStatusAppointmentsDoctorCardComponent } from './view-info-status-appointments-doctor-card.component';

describe('ViewInfoStatusAppointmentsDoctorCardComponent', () => {
  let component: ViewInfoStatusAppointmentsDoctorCardComponent;
  let fixture: ComponentFixture<ViewInfoStatusAppointmentsDoctorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewInfoStatusAppointmentsDoctorCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      ViewInfoStatusAppointmentsDoctorCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
