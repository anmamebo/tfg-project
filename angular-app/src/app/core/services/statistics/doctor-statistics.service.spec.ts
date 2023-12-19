import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DoctorStatisticsService } from './doctor-statistics.service';

describe('DoctorStatisticsService', () => {
  let service: DoctorStatisticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DoctorStatisticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
