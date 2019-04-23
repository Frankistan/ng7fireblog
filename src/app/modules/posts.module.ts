import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { AvatarModule } from "ngx-avatar";
import { CustomMaterialModule } from './custom-material.module';
import { CustomTinymceModule } from './custom-tinymce.module';
import { CustomTranslateModule } from './custom-translate.module';
import { LazyModule } from './lazy-module/lazy.module';
import { MomentModule } from 'ngx-moment';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollTrackerModule } from '@nicky-lenaers/ngx-scroll-tracker/scroll-tracker.module';
// Components
import { FabCreatePostComponent } from '@app/layout/fabs/create-post-fab.component';
import { FabEditPostComponent } from '@app/layout/fabs/edit-post-fab.component';
import { FabScrollToTopComponent } from '@app/layout/fabs/scroll-to-top-fab.component';
import { FileUploadDropzoneComponent } from '@app/layout/file-upload-dropzone/file-upload-dropzone.component';
import {
	GridViewComponent,
	ListViewComponent,
	PostElementComponent,
	PostEmptyComponent,
	PostFormComponent,
	PostListComponent,
	PostsComponent,
	PostShowComponent
} from '@app/posts';

// Directives & Pipes
import { FileSizePipe } from '@app/shared/pipes/file-size.pipe';
import { DropzoneDirective } from '@app/shared/directives/drop-zone.directive';
import { PostsRoutingModule } from '../posts/posts-routing.module';


@NgModule({
	declarations: [
		DropzoneDirective,
		FabCreatePostComponent,
		FabEditPostComponent,
		FabScrollToTopComponent,
		FileSizePipe,
		FileUploadDropzoneComponent,
		GridViewComponent,
		ListViewComponent,
		PostElementComponent,
		PostEmptyComponent,
		PostFormComponent,
		PostListComponent,
		PostsComponent,
		PostShowComponent,
	],
	imports: [
		AvatarModule,
		CommonModule,
		CustomMaterialModule,
		CustomTinymceModule,
		CustomTranslateModule,
		FlexLayoutModule,
		LazyModule,
		MomentModule,
		PostsRoutingModule,
		ReactiveFormsModule,
		RouterModule,
		ScrollTrackerModule,
	]
})
export class PostsModule { }
