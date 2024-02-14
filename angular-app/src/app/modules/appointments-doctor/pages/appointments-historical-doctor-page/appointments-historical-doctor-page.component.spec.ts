import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentsHistoricalDoctorPageComponent } from './appointments-historical-doctor-page.component';

describe('AppointmentsHistoricalDoctorPageComponent', () => {
  let component: AppointmentsHistoricalDoctorPageComponent;
  let fixture: ComponentFixture<AppointmentsHistoricalDoctorPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsHistoricalDoctorPageComponent],
    });
    fixture = TestBed.createComponent(
      AppointmentsHistoricalDoctorPageComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
