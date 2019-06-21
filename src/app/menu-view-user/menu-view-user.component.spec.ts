import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewUserComponent } from './menu-view-user.component';

describe('MenuViewUserComponent', () => {
  let component: MenuViewUserComponent;
  let fixture: ComponentFixture<MenuViewUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuViewUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
