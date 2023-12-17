import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DoctorAppointmentsSpecialtyColumnsChartComponent } from './doctor-appointments-specialty-columns-chart.component';

describe('DoctorAppointmentsSpecialtyColumnsChartComponent', () => {
  let component: DoctorAppointmentsSpecialtyColumnsChartComponent;
  let fixture: ComponentFixture<DoctorAppointmentsSpecialtyColumnsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorAppointmentsSpecialtyColumnsChartComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      DoctorAppointmentsSpecialtyColumnsChartComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
