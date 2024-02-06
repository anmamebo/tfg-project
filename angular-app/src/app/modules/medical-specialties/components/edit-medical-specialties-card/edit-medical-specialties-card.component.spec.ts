import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditMedicalSpecialtiesCardComponent } from './edit-medical-specialties-card.component';

describe('EditMedicalSpecialtiesCardComponent', () => {
  let component: EditMedicalSpecialtiesCardComponent;
  let fixture: ComponentFixture<EditMedicalSpecialtiesCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMedicalSpecialtiesCardComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(EditMedicalSpecialtiesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
