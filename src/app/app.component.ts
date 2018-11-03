import { Component, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { map } from "rxjs/operators";
import { MatSidenav } from "@angular/material";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    title = "Ng7fireblog";

    @ViewChild("drawer")
    drawer: MatSidenav;

    isMobile$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.XSmall)
        .pipe(map(result => result.matches));

    isHandset$: Observable<boolean> = this.breakpointObserver
        .observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    constructor(private breakpointObserver: BreakpointObserver) {}

    close() {
        this.isMobile$.subscribe(result => {
            if (result) this.drawer.close();
        });
    }
}
