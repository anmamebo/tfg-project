import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorAppointmentsGenderDonutChartComponent } from './doctor-appointments-gender-donut-chart.component';

describe('DoctorAppointmentsGenderDonutChartComponent', () => {
  let component: DoctorAppointmentsGenderDonutChartComponent;
  let fixture: ComponentFixture<DoctorAppointmentsGenderDonutChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorAppointmentsGenderDonutChartComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      DoctorAppointmentsGenderDonutChartComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
