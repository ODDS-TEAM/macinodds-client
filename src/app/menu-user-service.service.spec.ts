import { TestBed } from '@angular/core/testing';

import { MenuUserServiceService } from './menu-user-service.service';

describe('MenuUserServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuUserServiceService = TestBed.get(MenuUserServiceService);
    expect(service).toBeTruthy();
  });
});
