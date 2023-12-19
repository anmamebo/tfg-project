import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PdfTreatmentService } from './pdf-treatment.service';

describe('PdfTreatmentService', () => {
  let service: PdfTreatmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PdfTreatmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
