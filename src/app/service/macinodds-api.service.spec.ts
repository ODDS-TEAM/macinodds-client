import { TestBed } from '@angular/core/testing';

import { MacinoddsApiService } from './macinodds-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MacinoddsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: MacinoddsApiService = TestBed.get(MacinoddsApiService);
    expect(service).toBeTruthy();
  });
});
