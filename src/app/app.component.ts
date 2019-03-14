import { Component, ViewChild, OnInit } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import {
    Router,
    ActivatedRoute,
    NavigationEnd,
    NavigationStart,
    NavigationCancel,
    NavigationError
} from "@angular/router";
import { Title } from "@angular/platform-browser";
import { MatSidenav } from "@angular/material";
import { TranslateService } from "@ngx-translate/core";
import { Observable, merge } from "rxjs";
import { map, filter, mergeMap } from "rxjs/operators";
import { environment } from "@env/environment";
import { Store } from "@ngrx/store";
import * as fromApp from "./app.reducer";
import * as fromLayout from "./layout/layout.actions";
import { SettingsService, GeolocationService, I18nService, AuthService, CoreService } from "./shared";


@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    @ViewChild("drawer") drawer: MatSidenav;

    isMobile$: Observable<boolean> = this._bpo
        .observe(Breakpoints.XSmall)
        .pipe(map(result => result.matches));

    isHandset$: Observable<boolean> = this._bpo
        .observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    isLoading$: Observable<boolean>;
    isAuthenticated$: Observable<boolean>;

    constructor(
        private _set: SettingsService,
        private _aRoute: ActivatedRoute,
        private _bpo: BreakpointObserver,
        private _geo: GeolocationService,
        private _i18n: I18nService,
        private _rtr: Router,
        private _title: Title,
        private _trans: TranslateService,
        private _str: Store<fromApp.State>,
        public auth: AuthService,
        public core: CoreService,
    ) {
        this._set.loadSettings.subscribe(settings => {
            this.core.darkTheme.next(settings.isDark);
            this.core.language.next(settings.language);
        });

        this._geo.getCurrentPosition().subscribe(position => {
            this._geo.setPosition = position.coords;
        });

        this.isAuthenticated$ = this._str.select(fromApp.getIsAuth);

        let show$ = this._rtr.events.pipe(
            filter(event => event instanceof NavigationStart),
            map(event => this._str.dispatch(new fromLayout.StartLoading()))
        );

        let hide$ = this._rtr.events.pipe(
            filter(
                event =>
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel ||
                    event instanceof NavigationError
            ),
            map(event => this._str.dispatch(new fromLayout.StopLoading()))
        );

        merge(show$, hide$).subscribe();

        this.isLoading$ = this._str.select(fromApp.getIsLoading);
    }

    ngOnInit() {
        // Setup translations
        this._i18n.init(
            environment.defaultLanguage,
            environment.supportedLanguages
        );

        const onNavigationEnd = this._rtr.events.pipe(
            filter(event => event instanceof NavigationEnd)
        );

        // Change page title on navigation or language change, based on route data
        merge(this._trans.onLangChange, onNavigationEnd)
            .pipe(
                map(() => {
                    let route = this._aRoute;
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
                    this._i18n.breadcrumb.next(title);
                    this._title.setTitle(
                        this._trans.instant(title)
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
