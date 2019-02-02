import { Component, Output, EventEmitter } from "@angular/core";
import { MatSlideToggleChange, MatSelectChange } from "@angular/material";
import { CoreService, SettingsService, I18nService } from "@app/shared";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"]
})
export class SettingsComponent {
    checked = JSON.parse(localStorage.getItem("settings")).isDark;

    destroy = new Subject<any>();

    @Output() selectionChange: EventEmitter<MatSelectChange>;

    constructor(
        private coreSrv: CoreService,
        private settingsService: SettingsService,
        private i18nService: I18nService
    ) {
        coreSrv.darkTheme.pipe(takeUntil(this.destroy)).subscribe(isDark => {
            this.checked = isDark;
        });
    }

    switchTheme(event: MatSlideToggleChange) {
        let settings = {
            isDark: event.checked
        };

        this.coreSrv.darkTheme.next(event.checked);
        this.settingsService.saveSettings(settings);
    }

    setLanguage(event: MatSelectChange) {
        this.i18nService.language = event.value;

        let settings = {
            language: event.value
        };

        this.settingsService.saveSettings(settings);
    }

    currentLanguage(): string {
        return JSON.parse(localStorage.getItem("settings")).language;
    }

    get languages(): any {
        return this.i18nService.supportedLanguages;
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
