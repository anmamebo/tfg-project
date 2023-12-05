import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TreatmentService } from './treatment.service';

describe('TreatmentService', () => {
  let service: TreatmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TreatmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
