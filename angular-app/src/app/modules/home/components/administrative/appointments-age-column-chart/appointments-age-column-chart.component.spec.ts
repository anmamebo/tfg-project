import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentsAgeColumnChartComponent } from './appointments-age-column-chart.component';

describe('AppointmentsAgeColumnChartComponent', () => {
  let component: AppointmentsAgeColumnChartComponent;
  let fixture: ComponentFixture<AppointmentsAgeColumnChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsAgeColumnChartComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(AppointmentsAgeColumnChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
