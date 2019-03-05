import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoreService } from "@app/shared";

@Component({
    selector: "btn-search",
    template: `
        <a
            mat-icon-button
            matTooltip="{{ 'tooltips.search' | translate }}"
            [matTooltipClass]="'tooltip'"
            (click) ="open()"
        >
            <mat-icon>search</mat-icon>
        </a>
    `
})
export class BtnSearchComponent {
    constructor(private _rtr: Router,public core:CoreService) {}

    open(){
        this.core.isSearchOpened.next(true);
        // this.core.isSearching.next(true);
        this._rtr.navigate([{ outlets: { search: ['search'] } }]);
    }
}
