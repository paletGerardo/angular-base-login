import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from "../../core/material/material.module";
import { CardItemsComponent } from './components/card-items/card-items.component';

@NgModule({
    declarations: [

        CardItemsComponent
    ],
    exports: [
        CardItemsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ]
})
export class SharedModule { }
