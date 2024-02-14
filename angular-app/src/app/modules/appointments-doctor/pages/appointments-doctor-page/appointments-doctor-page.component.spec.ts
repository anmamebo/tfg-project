import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentsDoctorPageComponent } from './appointments-doctor-page.component';

describe('AppointmentsDoctorPageComponent', () => {
  let component: AppointmentsDoctorPageComponent;
  let fixture: ComponentFixture<AppointmentsDoctorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsDoctorPageComponent],
    });
    fixture = TestBed.createComponent(AppointmentsDoctorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
