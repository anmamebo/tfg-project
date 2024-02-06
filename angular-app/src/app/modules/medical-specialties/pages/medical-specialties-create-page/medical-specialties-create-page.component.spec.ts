import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalSpecialtiesCreatePageComponent } from './medical-specialties-create-page.component';

describe('MedicalSpecialtiesCreatePageComponent', () => {
  let component: MedicalSpecialtiesCreatePageComponent;
  let fixture: ComponentFixture<MedicalSpecialtiesCreatePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalSpecialtiesCreatePageComponent],
    });
    fixture = TestBed.createComponent(MedicalSpecialtiesCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
