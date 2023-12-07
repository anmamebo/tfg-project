import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewAppointmentsPatientCardComponent } from './view-appointments-patient-card.component';

describe('ViewAppointmentsPatientCardComponent', () => {
  let component: ViewAppointmentsPatientCardComponent;
  let fixture: ComponentFixture<ViewAppointmentsPatientCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAppointmentsPatientCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ViewAppointmentsPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
