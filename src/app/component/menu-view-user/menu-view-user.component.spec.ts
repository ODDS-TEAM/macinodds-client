import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewUserComponent } from './menu-view-user.component';
import { MatSidenavModule, MatToolbarModule, MatListModule, MatIconModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';

describe('MenuViewUserComponent', () => {
  let component: MenuViewUserComponent;
  let fixture: ComponentFixture<MenuViewUserComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuViewUserComponent ],
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
      ],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
