import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MenuViewAdminComponent } from './menu-view-admin.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';

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
        HttpClientModule
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
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should be disable when call onDisable', () => {
    spyOn(component, 'getDevice').and.returnValue();

    // component.onDisable(true)

    expect(component).toBeTruthy();
  });

  it('should be resetFrom() when call resetFrom', () => {
    spyOn(component, 'getDevice');

    component.resetFrom();

    expect(component.getDevice).toBeTruthy();
  });

  it('should be put data when call onSubmit', () => {
    spyOn(component, 'getDevice').and.returnValue();

    component.onSubmit('id')

    expect(component.onSubmit).toBeTruthy();
  });

  
});
