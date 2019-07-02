import { LayoutModule } from '@angular/cdk/layout';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';

import { SideNavUserComponent } from './side-nav-user.component';
import { RouterModule } from '@angular/router';

describe('SideNavUserComponent', () => {
  let component: SideNavUserComponent;
  let fixture: ComponentFixture<SideNavUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SideNavUserComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterModule.forRoot([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
