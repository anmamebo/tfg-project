import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppointmentsGenderAreaSplineChartComponent } from './appointments-gender-area-spline-chart.component';

describe('AppointmentsGenderAreaSplineChartComponent', () => {
  let component: AppointmentsGenderAreaSplineChartComponent;
  let fixture: ComponentFixture<AppointmentsGenderAreaSplineChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsGenderAreaSplineChartComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      AppointmentsGenderAreaSplineChartComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
