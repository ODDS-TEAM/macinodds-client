import { TestBed } from '@angular/core/testing';

import { DbConnectService } from './db-connect.service';

describe('DbConnectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbConnectService = TestBed.get(DbConnectService);
    expect(service).toBeTruthy();
  });
});
