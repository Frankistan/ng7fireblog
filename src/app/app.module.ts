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
import { FlexLayoutModule } from '@angular/flex-layout';
//COMPONENTS
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SidenavContentComponent } from "./layout/sidenav/sidenav-content/sidenav-content.component";
import { SidenavHeaderComponent } from "./layout/sidenav/sidenav-header/sidenav-header.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { SpinnerComponent } from './layout/spinner/spinner.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostShowComponent } from './posts/post-show/post-show.component';
import { PostFormComponent } from './posts/post-form/post-form.component';
import { PostEmptyComponent } from './posts/post-empty/post-empty.component';
import { LoginComponent } from "./auth/login/login.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { AuthGuard } from "./guards/auth.guard";
import { DiscardChangesGuard } from "./guards/discard-changes.guard";
import { LoggedInGuard } from "./guards/logged-in.guard";

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        SidenavHeaderComponent,
        SidenavContentComponent,
        NavbarComponent,
        SpinnerComponent,
        PostListComponent,
        PostShowComponent,
        PostFormComponent,
        PostEmptyComponent,
        LoginComponent,
        ResetPasswordComponent,
        SignupComponent,
    ],
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
        ReactiveFormsModule,
        FlexLayoutModule,
        ScrollingModule,
    ],
    // entryComponents: [
    //     ConfirmDialog,
    //     UploadProfileImageDialog,
    // ],
    providers: [
        AuthGuard,
        DiscardChangesGuard,
        LoggedInGuard,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
