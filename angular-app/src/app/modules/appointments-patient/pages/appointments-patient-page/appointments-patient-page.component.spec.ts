import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentsPatientPageComponent } from './appointments-patient-page.component';

describe('AppointmentsPatientPageComponent', () => {
  let component: AppointmentsPatientPageComponent;
  let fixture: ComponentFixture<AppointmentsPatientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsPatientPageComponent],
    });
    fixture = TestBed.createComponent(AppointmentsPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
