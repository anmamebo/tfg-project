import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMedicalSpecialtiesCardComponent } from './view-medical-specialties-card.component';

describe('ViewMedicalSpecialtiesCardComponent', () => {
  let component: ViewMedicalSpecialtiesCardComponent;
  let fixture: ComponentFixture<ViewMedicalSpecialtiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewMedicalSpecialtiesCardComponent]
    });
    fixture = TestBed.createComponent(ViewMedicalSpecialtiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
