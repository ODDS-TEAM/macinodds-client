
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentRoutingModule } from './component-routing.module';


import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule, MatCard, MatCardModule } from '@angular/material';


import { MenuAddDeviceComponent } from './menu-add-device/menu-add-device.component';
import { MenuViewAdminComponent } from './menu-view-admin/menu-view-admin.component';
import { EditAdminComponent } from './edit-admin/edit-admin.component';
import { MenuViewUserComponent } from './menu-view-user/menu-view-user.component';

// import alyle UI
import { LyResizingCroppingImageModule } from '@alyle/ui/resizing-cropping-images';
import { LyButtonModule } from '@alyle/ui/button';
import { LyIconModule } from '@alyle/ui/icon';
import { CardComponent } from './common/card/card.component';
<<<<<<< Updated upstream
import { HistoryComponent } from './common/history/history.component';
import { CdkTableModule } from '@angular/cdk/table';
=======
import { FormDeviceComponent } from './common/form-device/form-device.component';
import { MaterialModule } from './material-module';



>>>>>>> Stashed changes



@NgModule({
  declarations: [
    MenuAddDeviceComponent,
    MenuViewAdminComponent,
    EditAdminComponent,
    MenuViewUserComponent,
    CardComponent,
<<<<<<< Updated upstream
    HistoryComponent,
=======
    FormDeviceComponent
>>>>>>> Stashed changes

  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    LyResizingCroppingImageModule,
    LyButtonModule,
    LyIconModule,
<<<<<<< Updated upstream
    CdkTableModule
=======
    MatCardModule,
    MaterialModule

>>>>>>> Stashed changes
  ],
  exports: [MenuAddDeviceComponent],
})
export class ComponentModule { }
