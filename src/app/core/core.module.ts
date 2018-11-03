import { NgModule, 	SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { CoreService } from './services/core.service';
import { LocationService } from './services/location.service';
import { PaginationService } from './services/pagination.service';
import { PostsService } from './services/posts.service';
import { SettingsService } from './services/settings.service';
import { NotificationService } from './services/notification.service';
import { UserService } from './services/user.service';
import { FileManagerService } from './services/file-manager.service';	

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		AuthService,
		CoreService,
		LocationService,
		PaginationService,
		PostsService,
		SettingsService,
		NotificationService,
		UserService,
		FileManagerService,
	]
})
export class CoreModule {
	/* make sure CoreModule is imported only by one NgModule the AppModule */
	constructor(
		@Optional() @SkipSelf() parentModule: CoreModule
	) {
		if (parentModule) {
			throw new Error('CoreModule is already loaded. Import only in AppModule');
		}
	}
}