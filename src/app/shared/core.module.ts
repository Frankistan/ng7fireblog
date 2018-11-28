import { NgModule, SkipSelf, Optional } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthService } from "./services/auth.service";
import { CoreService } from "./services/core.service";
import { FileManagerService } from "./services/file-manager.service";
import { GeocodingService } from "./services/geocoding.service";
import { GeolocationService } from "./services/geolocation.service";
import { I18nService } from "./services/i18n.service";
import { NotificationService } from "./services/notification.service";
import { PaginationService } from "./services/pagination.service";
import { PostsService } from "./services/posts.service";
import { SettingsService } from "./services/settings.service";
import { UserService } from "./services/user.service";

@NgModule({
    imports: [CommonModule],
    declarations: [],
    providers: [
        AuthService,
        CoreService,
        FileManagerService,
        GeocodingService,
        GeolocationService,
        I18nService,
        NotificationService,
        PaginationService,
        PostsService,
        SettingsService,
        UserService,
    ]
})
export class CoreModule {
    /* make sure CoreModule is imported only by one NgModule the AppModule */
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                "CoreModule is already loaded. Import only in AppModule"
            );
        }
    }
}
