import { TestBed } from '@angular/core/testing';

import { SpecialguardService } from './specialguard.service';

describe('SpecialguardService', () => {
  let service: SpecialguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
