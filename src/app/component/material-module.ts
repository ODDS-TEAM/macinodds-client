import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatRadioModule } from '@angular/material';
@NgModule({
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule
    ]
})
export class  MaterialModule {}
