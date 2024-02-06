import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersAppointmentsPatientCardComponent } from './filters-appointments-patient-card.component';

describe('FiltersAppointmentsPatientCardComponent', () => {
  let component: FiltersAppointmentsPatientCardComponent;
  let fixture: ComponentFixture<FiltersAppointmentsPatientCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersAppointmentsPatientCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(FiltersAppointmentsPatientCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
