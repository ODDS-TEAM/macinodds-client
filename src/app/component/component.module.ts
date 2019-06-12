
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';

import { MenuAddDeviceComponent } from './menu-add-device/menu-add-device.component';
import { MenuViewAdminComponent } from './menu-view-admin/menu-view-admin.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MenuAddDeviceComponent,
    MenuViewAdminComponent

  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    HttpClientModule
  ]
})
export class ComponentModule { }
