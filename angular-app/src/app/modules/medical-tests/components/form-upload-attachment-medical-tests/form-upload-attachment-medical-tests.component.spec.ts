import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FormUploadAttachmentMedicalTestsComponent } from './form-upload-attachment-medical-tests.component';

describe('FormUploadAttachmentMedicalTestsComponent', () => {
  let component: FormUploadAttachmentMedicalTestsComponent;
  let fixture: ComponentFixture<FormUploadAttachmentMedicalTestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUploadAttachmentMedicalTestsComponent],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(
      FormUploadAttachmentMedicalTestsComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
