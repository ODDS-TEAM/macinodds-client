import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewAddminComponent } from './menu-view-addmin.component';

describe('MenuViewAddminComponent', () => {
  let component: MenuViewAddminComponent;
  let fixture: ComponentFixture<MenuViewAddminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuViewAddminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuViewAddminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
