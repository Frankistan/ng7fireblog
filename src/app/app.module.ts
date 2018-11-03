//MODULES
import { AppRoutingModule } from "./app-routing.module";
import { AvatarModule } from "ngx-avatar";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "./core/core.module";
import { CustomFirebaseModule } from "./modules/custom-firebase.module";
import { CustomFormsModule } from "ngx-custom-validators";
import { CustomMaterialModule } from "./modules/custom-material.module";
import { CustomTranslateModule } from "./modules/custom-translate.module";
import { ImageCropperModule } from "ngx-image-cropper";
import { MomentModule } from "ngx-moment";
import { NgModule } from "@angular/core";
import { NgxCaptchaModule } from "ngx-captcha";
import { NgxTinymceModule } from "ngx-tinymce";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//COMPONENTS
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
    declarations: [AppComponent, DashboardComponent],
    imports: [
        AppRoutingModule,
        AvatarModule,
        BrowserModule,
        CoreModule,
        CustomFirebaseModule,
        CustomFormsModule,
        CustomMaterialModule,
        CustomTranslateModule,
        FormsModule,
        ImageCropperModule,
        MomentModule,
        NgxCaptchaModule,
        NgxTinymceModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
