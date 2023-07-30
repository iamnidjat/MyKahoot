import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { specialguard2Guard } from './specialguard2.guard';

describe('specialguard2Guard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => specialguard2Guard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
