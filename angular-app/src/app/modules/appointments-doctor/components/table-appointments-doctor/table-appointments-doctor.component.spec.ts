import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableAppointmentsDoctorComponent } from './table-appointments-doctor.component';

describe('TableAppointmentsDoctorComponent', () => {
  let component: TableAppointmentsDoctorComponent;
  let fixture: ComponentFixture<TableAppointmentsDoctorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableAppointmentsDoctorComponent],
    });
    fixture = TestBed.createComponent(TableAppointmentsDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
