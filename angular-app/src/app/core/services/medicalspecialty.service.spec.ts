import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { MedicalspecialtyService } from './medicalspecialty.service';

describe('MedicalspecialtyService', () => {
  let service: MedicalspecialtyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MedicalspecialtyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
