import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionTreatmentsAppointmentsComponent } from './accordion-treatments-appointments.component';

describe('AccordionTreatmentsAppointmentsComponent', () => {
  let component: AccordionTreatmentsAppointmentsComponent;
  let fixture: ComponentFixture<AccordionTreatmentsAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccordionTreatmentsAppointmentsComponent]
    });
    fixture = TestBed.createComponent(AccordionTreatmentsAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
