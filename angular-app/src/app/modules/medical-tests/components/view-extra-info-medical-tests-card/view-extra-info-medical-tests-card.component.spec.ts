import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExtraInfoMedicalTestsCardComponent } from './view-extra-info-medical-tests-card.component';

describe('ViewExtraInfoMedicalTestsCardComponent', () => {
  let component: ViewExtraInfoMedicalTestsCardComponent;
  let fixture: ComponentFixture<ViewExtraInfoMedicalTestsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewExtraInfoMedicalTestsCardComponent]
    });
    fixture = TestBed.createComponent(ViewExtraInfoMedicalTestsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
