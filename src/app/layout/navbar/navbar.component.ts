import { Component, Input, OnDestroy } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { MatSidenav } from "@angular/material";
import { CoreService, AuthService, I18nService } from "@app/shared";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-navbar",
    templateUrl: "./navbar.component.html",
    styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnDestroy {
    @Input("drawer") drawer: MatSidenav;
    @Input("filterNavRef") filterNavRef: MatSidenav;

    destroy = new Subject<any>();

    isMobile$: Observable<boolean> = this._bpo
        .observe(Breakpoints.XSmall)
        .pipe(map(result => result.matches));

    isHandset$: Observable<boolean> = this._bpo
        .observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    constructor(
        private _bpo: BreakpointObserver,
        public auth: AuthService,
        public core: CoreService,
        public i18n: I18nService,
    ) {}

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
