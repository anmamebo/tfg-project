import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MedicalTestService } from './medicaltest.service';

describe('MedicaltestService', () => {
  let service: MedicalTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MedicalTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
