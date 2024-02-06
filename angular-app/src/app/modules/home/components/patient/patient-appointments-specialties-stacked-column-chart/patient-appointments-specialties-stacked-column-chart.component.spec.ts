import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientAppointmentsSpecialtiesStackedColumnChartComponent } from './patient-appointments-specialties-stacked-column-chart.component';

describe('PatientAppointmentsSpecialtiesStackedColumnChartComponent', () => {
  let component: PatientAppointmentsSpecialtiesStackedColumnChartComponent;
  let fixture: ComponentFixture<PatientAppointmentsSpecialtiesStackedColumnChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientAppointmentsSpecialtiesStackedColumnChartComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      PatientAppointmentsSpecialtiesStackedColumnChartComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
