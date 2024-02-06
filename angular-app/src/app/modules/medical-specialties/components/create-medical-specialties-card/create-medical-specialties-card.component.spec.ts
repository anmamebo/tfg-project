import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateMedicalSpecialtiesCardComponent } from './create-medical-specialties-card.component';

describe('CreateMedicalSpecialtiesCardComponent', () => {
  let component: CreateMedicalSpecialtiesCardComponent;
  let fixture: ComponentFixture<CreateMedicalSpecialtiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMedicalSpecialtiesCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(CreateMedicalSpecialtiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
