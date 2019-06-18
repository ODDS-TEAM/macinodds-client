import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MenuAddDeviceComponent } from './menu-add-device.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatRadioModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

describe('MenuAddDeviceComponent', () => {
  let component: MenuAddDeviceComponent;
  let fixture: ComponentFixture<MenuAddDeviceComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAddDeviceComponent],
      imports: [
        RouterTestingModule, 
        ReactiveFormsModule,
        MatRadioModule,
        HttpClientModule
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
    fixture = TestBed.createComponent(MenuAddDeviceComponent);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});