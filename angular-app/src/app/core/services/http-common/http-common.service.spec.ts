import { TestBed } from '@angular/core/testing';

import { HttpCommonService } from './http-common.service';

describe('HttpCommonService', () => {
  let service: HttpCommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpCommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
