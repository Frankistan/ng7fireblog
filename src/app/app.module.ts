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
import { NgxTinymceModule, TinymceOptions } from "ngx-tinymce";
import { ScrollTrackerModule } from "@nicky-lenaers/ngx-scroll-tracker";
import { NgxMasonryModule } from 'ngx-masonry';
//COMPONENTS
import { AppComponent } from "./app.component";
import { BtnFilterComponent } from '@app/layout/navbar/buttons/btn-filter/btn-filter.component';
import { BtnLangComponent } from '@app/layout/navbar/buttons/btn-lang.component';
import { BtnMoreComponent } from '@app/layout/navbar/buttons/btn-more/btn-more.component';
import { BtnSearchComponent } from '@app/layout/navbar/buttons/btn-search.component';
import { BtnSortByComponent } from '@app/layout/navbar/buttons/btn-sort-by/btn-sort-by.component';
import { BtnViewComponent } from '@app/layout/navbar/buttons/btn-view/btn-view.component';
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
import { SearchbarComponent } from "./layout/searchbar/searchbar.component";
import { SettingsComponent } from "./settings/settings.component";
import { SidenavContentComponent } from "./layout/sidenav/sidenav-content/sidenav-content.component";
import { SidenavHeaderComponent } from "./layout/sidenav/sidenav-header/sidenav-header.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { SpinnerComponent } from "./layout/spinner/spinner.component";
import { FileUploadDropzoneComponent } from "./layout/file-upload-dropzone/file-upload-dropzone.component";
//GUARDS
import { AuthGuard } from "./core/guards/auth.guard";
import { DiscardChangesGuard } from "./core/guards/discard-changes.guard";
import { LoggedInGuard } from "./core/guards/logged-in.guard";
//DIALOGS
import { ConfirmDialog } from "./layout/confirm-dialog/confirm-dialog.component";
import { UploadProfileImageDialog } from "./profile/upload-profile-image-dialog/upload-profile-image-dialog.component";
import { GridViewComponent } from "./posts/post-list/grid-view/grid-view.component";
import { ListViewComponent } from './posts/post-list/list-view/list-view.component';
import { FileSizePipe } from "./core/pipes/file-size.pipe";
import { LazyModule } from "./modules/lazy-module/lazy.module";

// tinymce configuration
const tOptions: TinymceOptions = {
    config: {
        height: 250,
        theme: 'modern',
        language: 'es',
        branding: false,
        // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
        plugins: 'emoticons print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern',
        toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | emoticons',
        image_advtab: true,
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        content_css: [
            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
            '//www.tinymce.com/css/codepen.min.css'
        ]
    }

}

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
        FabCreatePostComponent,
        FabEditPostComponent,
        FabScrollToTopComponent,
        FileUploadDropzoneComponent,
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
        UploadProfileImageDialog,
        GridViewComponent,
        ListViewComponent,
        FileSizePipe,
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
        NgxTinymceModule.forRoot(tOptions),
        ReactiveFormsModule,
        FlexLayoutModule,
        ScrollTrackerModule.forRoot(),
        NgxMasonryModule,
        LazyModule,
    ],
    entryComponents: [ConfirmDialog, UploadProfileImageDialog],
    providers: [AuthGuard, DiscardChangesGuard, LoggedInGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
