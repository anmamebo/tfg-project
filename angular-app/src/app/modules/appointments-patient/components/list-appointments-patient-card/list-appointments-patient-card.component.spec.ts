import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentsPatientCardComponent } from './list-appointments-patient-card.component';

describe('ListAppointmentsPatientCardComponent', () => {
  let component: ListAppointmentsPatientCardComponent;
  let fixture: ComponentFixture<ListAppointmentsPatientCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAppointmentsPatientCardComponent]
    });
    fixture = TestBed.createComponent(ListAppointmentsPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
