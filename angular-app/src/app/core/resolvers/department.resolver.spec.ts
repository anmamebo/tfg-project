import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { departmentResolver } from './department.resolver';

describe('departmentResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => departmentResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
