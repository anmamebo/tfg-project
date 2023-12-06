import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewReasonObservationsAppointmentsCardComponent } from './view-reason-observations-appointments-card.component';

describe('ViewReasonObservationsAppointmentsCardComponent', () => {
  let component: ViewReasonObservationsAppointmentsCardComponent;
  let fixture: ComponentFixture<ViewReasonObservationsAppointmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReasonObservationsAppointmentsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      ViewReasonObservationsAppointmentsCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
