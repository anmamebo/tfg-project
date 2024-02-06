import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTreatmentsPatientCardComponent } from './view-treatments-patient-card.component';

describe('ViewTreatmentsPatientCardComponent', () => {
  let component: ViewTreatmentsPatientCardComponent;
  let fixture: ComponentFixture<ViewTreatmentsPatientCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTreatmentsPatientCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ViewTreatmentsPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
