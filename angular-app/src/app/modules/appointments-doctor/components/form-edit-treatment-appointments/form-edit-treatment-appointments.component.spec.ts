import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormEditTreatmentAppointmentsComponent } from './form-edit-treatment-appointments.component';

describe('FormEditTreatmentAppointmentsComponent', () => {
  let component: FormEditTreatmentAppointmentsComponent;
  let fixture: ComponentFixture<FormEditTreatmentAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditTreatmentAppointmentsComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(FormEditTreatmentAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
