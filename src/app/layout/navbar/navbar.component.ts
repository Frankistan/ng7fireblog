import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { BreakpointObserver, Breakpoints, MediaMatcher } from "@angular/cdk/layout";
import { CoreService, AuthService, I18nService } from "@app/shared";
import { map } from "rxjs/operators";
import { MatSidenav } from "@angular/material";
import { Observable } from "rxjs";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent {
    @Input("drawer") drawer: MatSidenav;

    isMobile$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.XSmall)
        .pipe(map(result => result.matches));

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    constructor(
        private breakpointObserver: BreakpointObserver,
        public coreSrv: CoreService,
        public I18nService:I18nService,
        public auth: AuthService,
        changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
        ) {}
}
