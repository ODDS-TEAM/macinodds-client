/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyDataServiceService } from './my-data-service.service';

describe('Service: MyDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyDataServiceService]
    });
  });

  it('should ...', inject([MyDataServiceService], (service: MyDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
