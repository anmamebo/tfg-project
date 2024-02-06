import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormCreateTreatmentAppointmentsComponent } from './form-create-treatment-appointments.component';

describe('FormCreateTreatmentAppointmentsComponent', () => {
  let component: FormCreateTreatmentAppointmentsComponent;
  let fixture: ComponentFixture<FormCreateTreatmentAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateTreatmentAppointmentsComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(FormCreateTreatmentAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
