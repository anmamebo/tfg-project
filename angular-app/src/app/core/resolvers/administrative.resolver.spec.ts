import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';
import { administrativeResolver } from './administrative.resolver';

describe('administrativeResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() =>
      administrativeResolver(...resolverParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
