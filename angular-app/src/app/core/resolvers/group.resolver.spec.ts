import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { groupResolver } from './group.resolver';

describe('groupResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => groupResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
