import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthlyAppointmentsLineChartComponent } from './monthly-appointments-line-chart.component';

describe('MonthlyAppointmentsLineChartComponent', () => {
  let component: MonthlyAppointmentsLineChartComponent;
  let fixture: ComponentFixture<MonthlyAppointmentsLineChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthlyAppointmentsLineChartComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(MonthlyAppointmentsLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
