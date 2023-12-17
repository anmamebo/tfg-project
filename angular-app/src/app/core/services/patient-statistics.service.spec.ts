import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { PatientStatisticsService } from './patient-statistics.service';

describe('PatientStatisticsService', () => {
  let service: PatientStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PatientStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
