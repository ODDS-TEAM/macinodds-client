import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatRadioModule } from '@angular/material';
import { MatDialogModule, MatNativeDateModule } from '@angular/material';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
        MatDialogModule,
        MatNativeDateModule,
        MatGridListModule
    ]
})
export class  MaterialModule {}
