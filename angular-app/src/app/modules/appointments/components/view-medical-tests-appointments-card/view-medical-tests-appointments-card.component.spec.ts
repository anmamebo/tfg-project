import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ViewMedicalTestsAppointmentsCardComponent } from './view-medical-tests-appointments-card.component';

describe('ViewMedicalTestsAppointmentsCardComponent', () => {
  let component: ViewMedicalTestsAppointmentsCardComponent;
  let fixture: ComponentFixture<ViewMedicalTestsAppointmentsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMedicalTestsAppointmentsCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      ViewMedicalTestsAppointmentsCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
