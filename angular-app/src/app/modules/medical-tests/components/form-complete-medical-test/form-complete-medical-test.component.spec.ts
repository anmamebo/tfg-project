import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormCompleteMedicalTestComponent } from './form-complete-medical-test.component';

describe('FormCompleteMedicalTestComponent', () => {
  let component: FormCompleteMedicalTestComponent;
  let fixture: ComponentFixture<FormCompleteMedicalTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCompleteMedicalTestComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(FormCompleteMedicalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
