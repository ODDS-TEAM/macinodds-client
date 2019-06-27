import { TestBed } from '@angular/core/testing';

import { MacinoddsApiService } from './macinodds-api.service';

describe('MacinoddsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MacinoddsApiService = TestBed.get(MacinoddsApiService);
    expect(service).toBeTruthy();
  });
});
