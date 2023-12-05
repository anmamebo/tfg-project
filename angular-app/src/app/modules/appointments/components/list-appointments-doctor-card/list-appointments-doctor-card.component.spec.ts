import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListAppointmentsDoctorCardComponent } from './list-appointments-doctor-card.component';

describe('ListAppointmentsDoctorCardComponent', () => {
  let component: ListAppointmentsDoctorCardComponent;
  let fixture: ComponentFixture<ListAppointmentsDoctorCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAppointmentsDoctorCardComponent],
      imports: [HttpClientTestingModule]
    });
    fixture = TestBed.createComponent(ListAppointmentsDoctorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
