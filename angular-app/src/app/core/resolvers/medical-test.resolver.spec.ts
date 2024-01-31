import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { medicalTestResolver } from './medical-test.resolver';

describe('medicalTestResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => medicalTestResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
