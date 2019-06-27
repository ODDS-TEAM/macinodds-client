import { TestBed } from '@angular/core/testing';

import { MenuServiceUserService } from './menu-service-user.service';

describe('MenuServiceUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuServiceUserService = TestBed.get(MenuServiceUserService);
    expect(service).toBeTruthy();
  });
});
