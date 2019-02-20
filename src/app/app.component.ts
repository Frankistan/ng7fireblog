import { Component, ViewChild, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router";
import { Title } from "@angular/platform-browser";
import { MatSidenav } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import {
    SettingsService,
    AuthService,
    CoreService,
    GeolocationService,
    I18nService
} from "@app/shared";
import { Observable, merge } from "rxjs";
import { map, filter, mergeMap } from "rxjs/operators";
import { environment } from "@env/environment";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    // title = "Ng7fireblog";

    @ViewChild("drawer") drawer: MatSidenav;

    isMobile$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.XSmall)
        .pipe(map(result => result.matches));

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    constructor(
        private _settingsSVC: SettingsService,
        private activatedRoute: ActivatedRoute,
        private breakpointObserver: BreakpointObserver,
        private geo: GeolocationService,
        private i18nService: I18nService,
        private router: Router,
        private titleService: Title,
        private translateService: TranslateService,
        public auth: AuthService,
        public core: CoreService
    ) {
        this._settingsSVC.loadSettings.subscribe(settings => {
            this.core.darkTheme.next(settings.isDark);
            this.core.language.next(settings.language);
        });

        this.geo.getCurrentPosition().subscribe(position => {
            this.geo.setPosition = position.coords;
        });        
    }

    ngOnInit() {
        // Setup translations
        this.i18nService.init(
            environment.defaultLanguage,
            environment.supportedLanguages
        );

        const onNavigationEnd = this.router.events.pipe(
            filter(event => event instanceof NavigationEnd)
        );

        // Change page title on navigation or language change, based on route data
        merge(this.translateService.onLangChange, onNavigationEnd)
            .pipe(
                map(() => {
                    let route = this.activatedRoute;
                    while (route.firstChild) {
                        route = route.firstChild;
                    }
                    return route;
                }),
                filter(route => route.outlet === "primary"),
                mergeMap(route => route.data)
            )
            .subscribe(event => {
                const title = "title." + event["title"];

                if (title) {
                    this.i18nService.breadcrumb.next(title);
                    this.titleService.setTitle(
                        this.translateService.instant(title)
                    );
                }
            });
    }

    close() {
        this.isMobile$.subscribe(result => {
            if (result) this.drawer.close();
        });
    }
}
