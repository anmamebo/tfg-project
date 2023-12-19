import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PdfAppointmentService } from './pdf-appointment.service';

describe('PdfAppointmentService', () => {
  let service: PdfAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PdfAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
