import { Component, OnInit } from '@angular/core';
import { CoreService, SettingsService } from '@app/core';

@Component({
    selector: 'btn-lang',
    template: `
        <button fxHide.xs="true" mat-button
        [matMenuTriggerFor]="langMenu">
            {{ 'navbar.language' | translate }}
        </button>
        <button fxHide.gt-xs="true"
            matTooltip="{{ 'tooltips.language' | translate }}"
            [matTooltipClass]="'tooltip'"
            mat-icon-button
            [matMenuTriggerFor]="langMenu">
            <mat-icon>language</mat-icon>
        </button>
        <mat-menu #langMenu="matMenu">
            <button mat-menu-item (click)="switchLanguage('es')">
                <img class="flag flag-es"  />
                Español
            </button>
            <button mat-menu-item (click)="switchLanguage('en')">
                <img class="flag flag-us"  />
                English
            </button>
        </mat-menu>
    `,
})
export class BtnLangComponent implements OnInit {

    constructor(
        public coreSrv: CoreService,
        private settingsService: SettingsService,
    ) { }

    ngOnInit() {
    }

    switchLanguage(language: string) {
        let settings = {
            language: language
        };

        this.coreSrv.language.next(language);
        this.settingsService.saveSettings(settings);
    }

}

