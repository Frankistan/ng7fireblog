import { Component, OnInit } from "@angular/core";
import { AuthService } from "@app/core";
import { Observable } from "rxjs";
import { User } from "@app/models/user";

@Component({
    selector: "app-sidenav-header",
    templateUrl: "./sidenav-header.component.html",
    styleUrls: ["./sidenav-header.component.scss"]
})
export class SidenavHeaderComponent {
    user$: Observable<User>;

    constructor(private auth: AuthService) {
        this.user$ = auth.user;
    }
}
