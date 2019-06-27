
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';


import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';


import { MenuAddDeviceComponent } from './menu-add-device/menu-add-device.component';
import { MenuViewAdminComponent } from './menu-view-admin/menu-view-admin.component';
import { EditAdminComponent} from './edit-admin/edit-admin.component';
import { MenuViewUserComponent } from './menu-view-user/menu-view-user.component';

@NgModule({
  declarations: [
    MenuAddDeviceComponent,
    MenuViewAdminComponent,
    EditAdminComponent,
    MenuViewUserComponent,

  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
  ]
})
export class ComponentModule { }
