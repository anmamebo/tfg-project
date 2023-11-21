import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorsComponent } from './form-errors.component';

describe('FormErrorsComponent', () => {
  let component: FormErrorsComponent;
  let fixture: ComponentFixture<FormErrorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormErrorsComponent]
    });
    fixture = TestBed.createComponent(FormErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
