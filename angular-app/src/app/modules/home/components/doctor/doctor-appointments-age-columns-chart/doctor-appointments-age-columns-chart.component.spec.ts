import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorAppointmentsAgeColumnsChartComponent } from './doctor-appointments-age-columns-chart.component';

describe('DoctorAppointmentsAgeColumnsChartComponent', () => {
  let component: DoctorAppointmentsAgeColumnsChartComponent;
  let fixture: ComponentFixture<DoctorAppointmentsAgeColumnsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorAppointmentsAgeColumnsChartComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      DoctorAppointmentsAgeColumnsChartComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
