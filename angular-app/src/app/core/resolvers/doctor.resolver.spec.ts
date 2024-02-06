import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { doctorResolver } from './doctor.resolver';

describe('doctorResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => doctorResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
