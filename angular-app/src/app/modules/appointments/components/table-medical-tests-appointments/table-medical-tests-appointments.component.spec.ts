import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableMedicalTestsAppointmentsComponent } from './table-medical-tests-appointments.component';

describe('TableMedicalTestsAppointmentsComponent', () => {
  let component: TableMedicalTestsAppointmentsComponent;
  let fixture: ComponentFixture<TableMedicalTestsAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableMedicalTestsAppointmentsComponent],
    });
    fixture = TestBed.createComponent(TableMedicalTestsAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
