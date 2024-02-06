import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentsTypesStackedColumnChartComponent } from './appointments-types-stacked-column-chart.component';

describe('AppointmentsTypesStackedColumnChartComponent', () => {
  let component: AppointmentsTypesStackedColumnChartComponent;
  let fixture: ComponentFixture<AppointmentsTypesStackedColumnChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentsTypesStackedColumnChartComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      AppointmentsTypesStackedColumnChartComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
