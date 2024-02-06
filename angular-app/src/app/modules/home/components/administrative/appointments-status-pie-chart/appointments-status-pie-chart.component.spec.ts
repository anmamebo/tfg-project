import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentsStatusPieChartComponent } from './appointments-status-pie-chart.component';

describe('AppointmentsStatusPieChartComponent', () => {
  let component: AppointmentsStatusPieChartComponent;
  let fixture: ComponentFixture<AppointmentsStatusPieChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsStatusPieChartComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(AppointmentsStatusPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
