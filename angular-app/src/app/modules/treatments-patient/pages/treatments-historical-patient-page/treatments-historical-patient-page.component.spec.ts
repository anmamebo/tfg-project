import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreatmentsHistoricalPatientPageComponent } from './treatments-historical-patient-page.component';

describe('TreatmentsHistoricalPatientPageComponent', () => {
  let component: TreatmentsHistoricalPatientPageComponent;
  let fixture: ComponentFixture<TreatmentsHistoricalPatientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentsHistoricalPatientPageComponent],
    });
    fixture = TestBed.createComponent(TreatmentsHistoricalPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
