import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorsMedicalSpecialtiesDonutChartComponent } from './doctors-medical-specialties-donut-chart.component';

describe('DoctorsMedicalSpecialtiesDonutChartComponent', () => {
  let component: DoctorsMedicalSpecialtiesDonutChartComponent;
  let fixture: ComponentFixture<DoctorsMedicalSpecialtiesDonutChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorsMedicalSpecialtiesDonutChartComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      DoctorsMedicalSpecialtiesDonutChartComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
