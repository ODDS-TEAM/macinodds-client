import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { MenuAddDeviceComponent } from './menu-add-device/menu-add-device.component';
import { MenuViewAdminComponent } from './menu-view-admin/menu-view-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';



const routes: Routes = [
  //  { path: '' , redirectTo: 'menu-add-device', pathMatch: 'full' },
  { path: 'menu-add-device', component: MenuAddDeviceComponent },
  { path: 'menu-view-admin', component: MenuViewAdminComponent },
  { path: 'edit-admin', component: EditAdminComponent},
  // { path: 'path?refresh=1', redirectTo: 'menu-view-admin' },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
