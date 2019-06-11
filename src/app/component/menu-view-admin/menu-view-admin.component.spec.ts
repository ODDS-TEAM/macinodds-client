import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewAdminComponent } from './menu-view-admin.component';

describe('MenuViewAdminComponent', () => {
  let component: MenuViewAdminComponent;
  let fixture: ComponentFixture<MenuViewAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuViewAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
