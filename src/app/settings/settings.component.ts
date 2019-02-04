import { Component, Output, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";
import { MatSelectChange } from "@angular/material";
import { CoreService, SettingsService, I18nService } from "@app/shared";
import { takeUntil } from "rxjs/operators";


@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"]
})
export class SettingsComponent {
    checked = JSON.parse(localStorage.getItem("settings")).isDark;
    currentLanguage: string;
    destroy = new Subject<any>();
    settingsForm: FormGroup;

    @Output() selectionChange: EventEmitter<MatSelectChange>;

    constructor(
        private core: CoreService,
        private settingsService: SettingsService,
        private i18nService: I18nService,
        private fb: FormBuilder
    ) {
        core.darkTheme.pipe(takeUntil(this.destroy)).subscribe(isDark => {
            this.checked = isDark;
        });

        this.currentLanguage = this.getLanguage();
        this.createForm();
    }

    ngOnInit() {}

    private createForm() {
        this.settingsForm = this.fb.group({
            isDark: [false],
            language: [this.currentLanguage]
        });
    }

    save() {
        this.i18nService.language = this.settingsForm.get("language").value;
        this.core.darkTheme.next(this.settingsForm.get("isDark").value);
        this.settingsService.saveSettings(this.settingsForm.value);
    }

    getLanguage(): string {
        return this.i18nService.language;
    }

    get languages(): any {
        return this.i18nService.supportedLanguages;
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
