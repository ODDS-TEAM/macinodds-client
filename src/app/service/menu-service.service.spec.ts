import { TestBed } from '@angular/core/testing';

import { MenuServiceService } from './menu-service.service';

import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';

describe('MenuServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MenuServiceService = TestBed.get(MenuServiceService);
    expect(service).toBeTruthy();
  });

  it('should be show subMenu', () => {
    const service: MenuServiceService = TestBed.get(MenuServiceService);
    expect(service.getSubMenuName('')).toBeFalsy();
  });

});
