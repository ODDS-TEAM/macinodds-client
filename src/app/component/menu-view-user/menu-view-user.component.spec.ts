import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewUserComponent } from './menu-view-user.component';
import { MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from 'src/app/login/login.component';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from 'src/app/side-nav/side-nav.component';
import { SideNavUserComponent } from 'src/app/side-nav-user/side-nav-user.component';

describe('MenuViewUserComponent', () => {
  let component: MenuViewUserComponent;
  let fixture: ComponentFixture<MenuViewUserComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatIconModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AppRoutingModule,
        RouterModule.forRoot([]),
      ],
      declarations: [ MenuViewUserComponent, LoginComponent , SideNavUserComponent , SideNavComponent ],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create MenuViewUserComponent', () => {
    expect(component).toBeTruthy();
  });

});
