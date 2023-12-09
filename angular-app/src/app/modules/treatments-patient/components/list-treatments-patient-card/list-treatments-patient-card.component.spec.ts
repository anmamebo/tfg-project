import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListTreatmentsPatientCardComponent } from './list-treatments-patient-card.component';

describe('ListTreatmentsPatientCardComponent', () => {
  let component: ListTreatmentsPatientCardComponent;
  let fixture: ComponentFixture<ListTreatmentsPatientCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListTreatmentsPatientCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ListTreatmentsPatientCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
