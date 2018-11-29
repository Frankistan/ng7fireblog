//MODULES
import { AppRoutingModule } from "./app-routing.module";
import { AvatarModule } from "ngx-avatar";
import { BrowserModule } from "@angular/platform-browser";
import { CoreModule } from "./shared/core.module";
import { CustomFirebaseModule } from "./modules/custom-firebase.module";
import { CustomFormsModule } from "ngx-custom-validators";
import { CustomMaterialModule } from "./modules/custom-material.module";
import { CustomTinymceModule } from "./modules/custom-tinymce.module";
import { CustomTranslateModule } from "./modules/custom-translate.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ImageCropperModule } from "ngx-image-cropper";
import { LazyModule } from "./modules/lazy-module/lazy.module";
import { MomentModule } from "ngx-moment";
import { NgModule } from "@angular/core";
import { NgxCaptchaModule } from "ngx-captcha";
import { NgxMasonryModule } from "ngx-masonry";
import { ScrollTrackerModule } from "@nicky-lenaers/ngx-scroll-tracker";
//COMPONENTS
import { AppComponent } from "./app.component";
import { BtnFilterComponent } from "@app/layout/navbar/buttons/btn-filter/btn-filter.component";
import { BtnLangComponent } from "@app/layout/navbar/buttons/btn-lang.component";
import { BtnMoreComponent } from "@app/layout/navbar/buttons/btn-more/btn-more.component";
import { BtnSearchComponent } from "@app/layout/navbar/buttons/btn-search.component";
import { BtnSortByComponent } from "@app/layout/navbar/buttons/btn-sort-by/btn-sort-by.component";
import { BtnViewComponent } from "@app/layout/navbar/buttons/btn-view/btn-view.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FabCreatePostComponent } from "@app/layout/fabs/create-post-fab.component";
import { FabEditPostComponent } from "@app/layout/fabs/edit-post-fab.component";
import { FabScrollToTopComponent } from "@app/layout/fabs/scroll-to-top-fab.component";
import { FileUploadDropzoneComponent } from "./layout/file-upload-dropzone/file-upload-dropzone.component";
import { GridViewComponent } from "./posts/post-list/grid-view/grid-view.component";
import { ListViewComponent } from "./posts/post-list/list-view/list-view.component";
import { LoginComponent } from "./auth/login/login.component";
import { NavbarComponent } from "./layout/navbar/navbar.component";
import { PostElementComponent } from "./posts/post-list/post-element/post-element.component";
import { PostEmptyComponent } from "./posts/post-empty/post-empty.component";
import { PostFormComponent } from "./posts/post-form/post-form.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostShowComponent } from "./posts/post-show/post-show.component";
import { ProfileComponent } from "./profile/profile.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { SearchbarComponent } from "./layout/searchbar/searchbar.component";
import { SettingsComponent } from "./settings/settings.component";
import { SidenavContentComponent } from "./layout/sidenav/sidenav-content/sidenav-content.component";
import { SidenavHeaderComponent } from "./layout/sidenav/sidenav-header/sidenav-header.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SpinnerComponent } from "./layout/spinner/spinner.component";
//GUARDS
import { AuthGuard } from "./shared/guards/auth.guard";
import { DiscardChangesGuard } from "./shared/guards/discard-changes.guard";
import { LoggedInGuard } from "./shared/guards/logged-in.guard";
//DIALOGS
import { ConfirmDialog } from "./layout/confirm-dialog/confirm-dialog.component";
import { UploadProfileImageDialog } from "./profile/upload-profile-image-dialog/upload-profile-image-dialog.component";
//DIRECTIVES
import { DropZoneDirective } from "./shared/directives/drop-zone.directive";
//PIPES
import { FileSizePipe } from "./shared/pipes/file-size.pipe";

@NgModule({
    declarations: [
        AppComponent,
        BtnFilterComponent,
        BtnLangComponent,
        BtnMoreComponent,
        BtnSearchComponent,
        BtnSortByComponent,
        BtnViewComponent,
        ConfirmDialog,
        DashboardComponent,
        DropZoneDirective,
        FabCreatePostComponent,
        FabEditPostComponent,
        FabScrollToTopComponent,
        FileSizePipe,
        FileUploadDropzoneComponent,
        GridViewComponent,
        ListViewComponent,
        LoginComponent,
        NavbarComponent,
        PostElementComponent,
        PostEmptyComponent,
        PostFormComponent,
        PostListComponent,
        PostShowComponent,
        ProfileComponent,
        ResetPasswordComponent,
        SearchbarComponent,
        SettingsComponent,
        SidenavContentComponent,
        SidenavHeaderComponent,
        SignupComponent,
        SpinnerComponent,
        UploadProfileImageDialog
    ],
    imports: [
        AppRoutingModule,
        AvatarModule,
        BrowserModule,
        CoreModule,
        CustomFirebaseModule,
        CustomFormsModule,
        CustomMaterialModule,
        CustomTinymceModule,
        CustomTranslateModule,
        FlexLayoutModule,
        FormsModule,
        ImageCropperModule,
        LazyModule,
        MomentModule,
        NgxCaptchaModule,
        NgxMasonryModule,
        ReactiveFormsModule,
        ScrollTrackerModule.forRoot()
    ],
    entryComponents: [ConfirmDialog, UploadProfileImageDialog],
    providers: [AuthGuard, DiscardChangesGuard, LoggedInGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
