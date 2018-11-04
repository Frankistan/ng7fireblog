//MODULES
import { AppRoutingModule } from "./app-routing.module";
import { AvatarModule } from "ngx-avatar";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "./core/core.module";
import { CustomFirebaseModule } from "./modules/custom-firebase.module";
import { CustomFormsModule } from "ngx-custom-validators";
import { CustomMaterialModule } from "./modules/custom-material.module";
import { CustomTranslateModule } from "./modules/custom-translate.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ImageCropperModule } from "ngx-image-cropper";
import { MomentModule } from "ngx-moment";
import { NgModule } from "@angular/core";
import { NgxCaptchaModule } from "ngx-captcha";
import { NgxTinymceModule } from "ngx-tinymce";
import { ScrollTrackerModule } from "@nicky-lenaers/ngx-scroll-tracker";
//COMPONENTS
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FabCreatePostComponent } from "@app/layout/fabs/create-post-fab.component";
import { FabEditPostComponent } from "@app/layout/fabs/edit-post-fab.component";
import { FabScrollToTopComponent } from "@app/layout/fabs/scroll-to-top-fab.component";
import { LoginComponent } from "./auth/login/login.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { PostElementComponent } from "./posts/post-list/post-element/post-element.component";
import { PostEmptyComponent } from "./posts/post-empty/post-empty.component";
import { PostFormComponent } from "./posts/post-form/post-form.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostShowComponent } from "./posts/post-show/post-show.component";
import { ProfileComponent } from "./profile/profile.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { SettingsComponent } from "./settings/settings.component";
import { SidenavContentComponent } from "./layout/sidenav/sidenav-content/sidenav-content.component";
import { SidenavHeaderComponent } from "./layout/sidenav/sidenav-header/sidenav-header.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SpinnerComponent } from "./layout/spinner/spinner.component";
//GUARDS
import { AuthGuard } from "./core/guards/auth.guard";
import { DiscardChangesGuard } from "./core/guards/discard-changes.guard";
import { LoggedInGuard } from "./core/guards/logged-in.guard";
//DIALOGS
import { ConfirmDialog } from "./layout/confirm-dialog/confirm-dialog.component";
import { UploadProfileImageDialog } from "./profile/upload-profile-image-dialog/upload-profile-image-dialog.component";


@NgModule({
    declarations: [
        AppComponent,
        ConfirmDialog,
        DashboardComponent,
        FabCreatePostComponent,
        FabEditPostComponent,
        FabScrollToTopComponent,
        LoginComponent,
        NavbarComponent,
        PostElementComponent,
        PostEmptyComponent,
        PostFormComponent,
        PostListComponent,
        PostShowComponent,
        ProfileComponent,
        ResetPasswordComponent,
        SettingsComponent,
        SidenavContentComponent,
        SidenavHeaderComponent,
        SignupComponent,
        SpinnerComponent,
        UploadProfileImageDialog,
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
        ScrollTrackerModule.forRoot(),
    ],
    entryComponents: [ConfirmDialog, UploadProfileImageDialog],
    providers: [AuthGuard, DiscardChangesGuard, LoggedInGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
