import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MenuAddDeviceComponent } from './menu-add-device.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatRadioModule } from '@angular/material';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LyIconModule } from '@alyle/ui/icon';
import { LyResizingCroppingImageModule, ImgCropperConfig } from '@alyle/ui/resizing-cropping-images';
import { LyTheme2, LY_THEME } from '@alyle/ui';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentRoutingModule } from '../component-routing.module';


describe('MenuAddDeviceComponent', () => {
  let component: MenuAddDeviceComponent;
  let fixture: ComponentFixture<MenuAddDeviceComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        MatRadioModule,
        HttpClientModule,
        HttpClientTestingModule,
        LyIconModule,
        LyResizingCroppingImageModule,
        ChangeDetectionStrategy,
        HttpClient,
        ComponentRoutingModule

      ],
      declarations: [MenuAddDeviceComponent, LY_THEME],
      providers: [
        {
          provide: FormBuilder,
          useValue: formBuilder
        },
        LyTheme2,
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

  // it('should create MenuAddDeviceComponent', () => {
  //   expect(component).toBeTruthy();
  // });

});
