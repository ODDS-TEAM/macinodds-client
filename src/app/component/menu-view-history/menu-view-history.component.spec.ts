import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewHistoryComponent } from './menu-view-history.component';

describe('MenuViewHistoryComponent', () => {
  let component: MenuViewHistoryComponent;
  let fixture: ComponentFixture<MenuViewHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuViewHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuViewHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
