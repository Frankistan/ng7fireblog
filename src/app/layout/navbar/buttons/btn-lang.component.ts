import { Component } from "@angular/core";
import { CoreService, SettingsService, I18nService } from "@app/shared";

@Component({
    selector: "btn-lang",
    template: `
        <button fxHide.xs="true" mat-button [matMenuTriggerFor]="langMenu">
            {{ currentLanguage }}
        </button>
        <button
            fxHide.gt-xs="true"
            matTooltip="{{ 'tooltips.language' | translate }}"
            [matTooltipClass]="'tooltip'"
            mat-icon-button
            [matMenuTriggerFor]="langMenu"
        >
            <mat-icon>language</mat-icon>
        </button>
        <mat-menu #langMenu="matMenu">
            <button
                mat-menu-item
                *ngFor="let language of languages"
                (click)="setLanguage(language)"
            >
                <img
                    class="flag flag-{{ language.split('-')[1].toLocaleLowerCase() }}"
                />
                {{ language.split("-")[1] == "ES" ? "Español" : "English" }}
            </button>
        </mat-menu>
    `
})
export class BtnLangComponent {
    constructor(
        public coreSrv: CoreService,
        private settingsService: SettingsService,
        private i18nService: I18nService
    ) {}

    setLanguage(language: string) {
        this.i18nService.language = language;

        let settings = {
            language: language
        };

        this.settingsService.saveSettings(settings);
    }

    get currentLanguage(): string {
        return this.i18nService.language.split("-")[1] == "ES"
            ? "Español"
            : "English";
    }

    get languages(): any {
        return this.i18nService.supportedLanguages;
    }
}
