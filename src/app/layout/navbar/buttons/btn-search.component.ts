import { Component } from '@angular/core';
import { CoreService } from '@app/shared';

@Component({
    selector: 'btn-search',
    template:`
        <button mat-icon-button
            matTooltip="{{ 'tooltips.search' | translate }}"
            [matTooltipClass]="'tooltip'"
            (click)="openSearch()">
            <mat-icon>search</mat-icon>
        </button>
    `
})
export class BtnSearchComponent {

    constructor(public core: CoreService) {}

    openSearch() {
        this.core.isSearching.next(true);
    }
}
