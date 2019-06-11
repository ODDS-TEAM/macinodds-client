import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAddDeviceComponent } from './menu-add-device/menu-add-device.component';
import { MenuViewAddminComponent } from './menu-view-addmin/menu-view-addmin.component';



const routes: Routes = [
  { path: '', redirectTo: 'menu-add-device', pathMatch: 'full' },
  { path: 'menu-add-device', component: MenuAddDeviceComponent },
  { path: 'menu-view-addmin', component: MenuViewAddminComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
