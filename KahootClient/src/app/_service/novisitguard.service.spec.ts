import { TestBed } from '@angular/core/testing';

import { NovisitguardService } from './novisitguard.service';

describe('NovisitguardService', () => {
  let service: NovisitguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NovisitguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
