import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AdministrativeService } from './administrative.service';

describe('AdministrativeService', () => {
  let service: AdministrativeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AdministrativeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
