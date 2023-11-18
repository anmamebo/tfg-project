import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { patientResolver } from './patient.resolver';

describe('patientResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => patientResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
