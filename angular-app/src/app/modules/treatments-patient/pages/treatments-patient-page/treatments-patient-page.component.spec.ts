import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentsPatientPageComponent } from './treatments-patient-page.component';

describe('TreatmentsPatientPageComponent', () => {
  let component: TreatmentsPatientPageComponent;
  let fixture: ComponentFixture<TreatmentsPatientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentsPatientPageComponent]
    });
    fixture = TestBed.createComponent(TreatmentsPatientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
