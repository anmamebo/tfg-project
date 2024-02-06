import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { medicalSpecialtyResolver } from './medical-specialty.resolver';

describe('medicalSpecialtyResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      medicalSpecialtyResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
