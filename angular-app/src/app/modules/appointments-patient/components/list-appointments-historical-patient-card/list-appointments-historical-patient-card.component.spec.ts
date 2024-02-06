import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAppointmentsHistoricalPatientCardComponent } from './list-appointments-historical-patient-card.component';

describe('ListAppointmentsHistoricalPatientCardComponent', () => {
  let component: ListAppointmentsHistoricalPatientCardComponent;
  let fixture: ComponentFixture<ListAppointmentsHistoricalPatientCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListAppointmentsHistoricalPatientCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      ListAppointmentsHistoricalPatientCardComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
