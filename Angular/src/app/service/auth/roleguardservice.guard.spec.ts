import { TestBed } from '@angular/core/testing';

import { RoleguardserviceGuard } from './roleguardservice.guard';

describe('RoleguardserviceGuard', () => {
  let guard: RoleguardserviceGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleguardserviceGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
