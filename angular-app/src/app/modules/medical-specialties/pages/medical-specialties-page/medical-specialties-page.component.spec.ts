import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MedicalSpecialtiesPageComponent } from './medical-specialties-page.component';

describe('MedicalSpecialtiesPageComponent', () => {
  let component: MedicalSpecialtiesPageComponent;
  let fixture: ComponentFixture<MedicalSpecialtiesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicalSpecialtiesPageComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(MedicalSpecialtiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
