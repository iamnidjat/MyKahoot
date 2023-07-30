import { TestBed } from '@angular/core/testing';

import { StudentsguardService } from './studentsguard.service';

describe('StudentsguardService', () => {
  let service: StudentsguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentsguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
