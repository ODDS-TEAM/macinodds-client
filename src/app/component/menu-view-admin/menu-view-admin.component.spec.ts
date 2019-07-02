import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MenuViewAdminComponent } from './menu-view-admin.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


describe('MenuViewAdminComponent', () => {
  let component: MenuViewAdminComponent;
  let fixture: ComponentFixture<MenuViewAdminComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuViewAdminComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatRadioModule,
        HttpClientModule,
        RouterModule.forRoot([])
      ],
      providers: [
        { provide: FormBuilder,
          useValue: formBuilder }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.options = formBuilder.group({
      name: '',
      serial: '',
      spec: '',
      image: '',
      status: false,
      holder: ''
    });
  });


});
