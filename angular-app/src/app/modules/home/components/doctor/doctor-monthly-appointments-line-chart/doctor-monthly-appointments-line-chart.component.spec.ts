import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorMonthlyAppointmentsLineChartComponent } from './doctor-monthly-appointments-line-chart.component';

describe('DoctorMonthlyAppointmentsLineChartComponent', () => {
  let component: DoctorMonthlyAppointmentsLineChartComponent;
  let fixture: ComponentFixture<DoctorMonthlyAppointmentsLineChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorMonthlyAppointmentsLineChartComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      DoctorMonthlyAppointmentsLineChartComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
