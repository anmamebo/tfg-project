import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableMedicalTestsAppointmentsDoctorComponent } from './table-medical-tests-appointments-doctor.component';

describe('TableMedicalTestsAppointmentsDoctorComponent', () => {
  let component: TableMedicalTestsAppointmentsDoctorComponent;
  let fixture: ComponentFixture<TableMedicalTestsAppointmentsDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableMedicalTestsAppointmentsDoctorComponent],
    });
    fixture = TestBed.createComponent(
      TableMedicalTestsAppointmentsDoctorComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
