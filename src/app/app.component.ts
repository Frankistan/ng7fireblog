import { Component, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { MatSidenav } from "@angular/material";
import { LocationService, SettingsService, AuthService, CoreService } from "./core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    title = "Ng7fireblog";

    @ViewChild("drawer") drawer: MatSidenav;

    isMobile$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.XSmall)
        .pipe(map(result => result.matches));

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));


    constructor(
        private breakpointObserver: BreakpointObserver,
        private _locationSVC: LocationService,
        private _settingsSVC: SettingsService,
        private _translateSVC: TranslateService,
        public auth: AuthService,
        public core: CoreService,
    ) {
        // Setting default lang that will be used as
        // a fallback when a translation
        // isn't found in the current language
        this._translateSVC.setDefaultLang('es');

        this._settingsSVC.loadSettings.subscribe((settings) => {

            this.core.darkTheme.next(settings.isDark);
            this.core.language.next(settings.language);
        });

        this._locationSVC.getCurrentLocation();
    }

    close() {
        this.isMobile$.subscribe(result => {
            if (result) this.drawer.close();
        });
    }
}
