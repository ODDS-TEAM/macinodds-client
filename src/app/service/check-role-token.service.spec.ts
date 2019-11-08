import { TestBed } from '@angular/core/testing';

import { CheckRoleTokenService } from './check-role-token.service';

describe('CheckRoleTokenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CheckRoleTokenService = TestBed.get(CheckRoleTokenService);
    expect(service).toBeTruthy();
  });
});
