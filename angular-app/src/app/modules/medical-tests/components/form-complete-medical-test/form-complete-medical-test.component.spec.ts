import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCompleteMedicalTestComponent } from './form-complete-medical-test.component';

describe('FormCompleteMedicalTestComponent', () => {
  let component: FormCompleteMedicalTestComponent;
  let fixture: ComponentFixture<FormCompleteMedicalTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCompleteMedicalTestComponent]
    });
    fixture = TestBed.createComponent(FormCompleteMedicalTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
