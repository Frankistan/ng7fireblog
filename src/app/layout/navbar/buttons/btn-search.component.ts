import { Component } from '@angular/core';
import { CoreService } from '@app/shared';

@Component({
    selector: 'btn-search',
    template:`
        <a mat-icon-button
            matTooltip="{{ 'tooltips.search' | translate }}"
            [matTooltipClass]="'tooltip'"
            routerLink="/posts/search">
            <mat-icon>search</mat-icon>
        </a>
    `
})
export class BtnSearchComponent {

    constructor(public core: CoreService) {}

    openSearch() {
        this.core.isSearching.next(true);
    }
}
