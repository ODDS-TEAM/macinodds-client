
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';

import { MenuAddDeviceComponent } from './menu-add-device/menu-add-device.component';
import { MenuViewAddminComponent } from './menu-view-addmin/menu-view-addmin.component';

@NgModule({
  declarations: [
    MenuAddDeviceComponent,
    MenuViewAddminComponent

  ],
  imports: [
    CommonModule,
    ComponentRoutingModule
  ]
})
export class ComponentModule { }
