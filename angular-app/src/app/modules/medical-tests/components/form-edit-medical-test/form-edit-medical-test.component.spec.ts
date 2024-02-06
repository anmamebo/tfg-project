import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormEditMedicalTestComponent } from './form-edit-medical-test.component';

describe('FormEditMedicalTestComponent', () => {
  let component: FormEditMedicalTestComponent;
  let fixture: ComponentFixture<FormEditMedicalTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormEditMedicalTestComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(FormEditMedicalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
