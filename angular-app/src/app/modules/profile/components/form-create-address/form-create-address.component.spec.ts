import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormCreateAddressComponent } from './form-create-address.component';

describe('FormCreateAddressComponent', () => {
  let component: FormCreateAddressComponent;
  let fixture: ComponentFixture<FormCreateAddressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreateAddressComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(FormCreateAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
