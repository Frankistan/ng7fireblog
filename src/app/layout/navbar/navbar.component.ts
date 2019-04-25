import { Component, Input, OnDestroy } from "@angular/core";
import { Router, NavigationEnd, ActivatedRoute } from "@angular/router";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material";
import {
    AuthService,
    I18nService,
    CoreService,
    PaginationService
} from "@app/shared";
import { Observable, Subject, BehaviorSubject } from "rxjs";
import { map, filter } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp  from "@app/store/reducers/app.reducer";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnDestroy {
    @Input("drawer") drawer: MatSidenav;

    @Input("filterNavRef") filterNavRef: MatSidenav;

    isMobile$: Observable<boolean> = this._bpo
        .observe(Breakpoints.XSmall)
        .pipe(map(result => result.matches));

    isHandset$: Observable<boolean> = this._bpo
        .observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    destroy = new Subject<any>();
    url: BehaviorSubject<string> = new BehaviorSubject("");
    postId: BehaviorSubject<string> = new BehaviorSubject("");
    router$: Observable<ActivatedRoute>;
    isSearchOpened: boolean = false;
    isSearching: boolean = false;
    isAuthenticated$: Observable<boolean>;

    constructor(
        private _bpo: BreakpointObserver,
        private _route: ActivatedRoute,
        private _rtr: Router,
        public auth: AuthService,
        public i18n: I18nService,
        private core: CoreService,
        private page: PaginationService,
        private store: Store<fromApp.State>
    ) {
        
        this.core.isSearching.subscribe(s => {
            this.isSearching = s;
        });
        this.core.isSearchOpened.subscribe(o => {
            this.isSearchOpened = o;
        });

        this.isAuthenticated$ = this.store.select(fromApp.getIsAuth);

        this._rtr.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map((event: NavigationEnd) => {
                    this.url.next(event.url);

                    if (this.isSearching && event.url == "/posts") {
                        this.page.reset();
                        this.page.init("posts", "created_at", {
                            reverse: true
                        });
                        this.core.isSearching.next(false);
                    }

                    this.core.isSearchOpened.next(
                        event.url === "/posts(search:search)"
                    );

                    return this._route;
                }),
                map(route => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter(route => route.outlet === "primary")
            )
            .subscribe((event: ActivatedRoute) => {
                this.postId.next(event.snapshot.params["id"]);
            });
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
