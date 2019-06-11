import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAddDeviceComponent } from './menu-add-device.component';

describe('MenuAddDeviceComponent', () => {
  let component: MenuAddDeviceComponent;
  let fixture: ComponentFixture<MenuAddDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuAddDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAddDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
