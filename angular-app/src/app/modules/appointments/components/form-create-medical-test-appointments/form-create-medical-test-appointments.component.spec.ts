import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormCreateMedicalTestAppointmentsComponent } from './form-create-medical-test-appointments.component';

describe('FormCreateMedicalTestAppointmentsComponent', () => {
  let component: FormCreateMedicalTestAppointmentsComponent;
  let fixture: ComponentFixture<FormCreateMedicalTestAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateMedicalTestAppointmentsComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      FormCreateMedicalTestAppointmentsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
