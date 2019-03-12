import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomMaterialModule } from "./custom-material.module";
import { FormsModule } from "@angular/forms";
import { CustomTranslateModule } from "./custom-translate.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        CustomMaterialModule,
        FormsModule,
		CustomTranslateModule,
		FlexLayoutModule
    ],
    exports: [
        CommonModule,
        CustomMaterialModule,
        FormsModule,
		CustomTranslateModule,
		FlexLayoutModule
    ]
})
export class SharedModule {}
