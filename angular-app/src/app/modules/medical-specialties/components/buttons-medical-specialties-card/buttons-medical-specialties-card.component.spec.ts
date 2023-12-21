import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ButtonsMedicalSpecialtiesCardComponent } from './buttons-medical-specialties-card.component';

describe('ButtonsMedicalSpecialtiesCardComponent', () => {
  let component: ButtonsMedicalSpecialtiesCardComponent;
  let fixture: ComponentFixture<ButtonsMedicalSpecialtiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonsMedicalSpecialtiesCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(ButtonsMedicalSpecialtiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
