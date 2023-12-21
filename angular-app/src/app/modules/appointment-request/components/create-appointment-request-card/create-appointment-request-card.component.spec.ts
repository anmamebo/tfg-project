import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CreateAppointmentRequestCardComponent } from './create-appointment-request-card.component';

describe('CreateAppointmentRequestCardComponent', () => {
  let component: CreateAppointmentRequestCardComponent;
  let fixture: ComponentFixture<CreateAppointmentRequestCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAppointmentRequestCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CreateAppointmentRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
