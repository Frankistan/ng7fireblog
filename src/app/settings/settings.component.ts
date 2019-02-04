import { Component, Output, EventEmitter } from "@angular/core";
import { Subject, Observable } from "rxjs";
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
    private _changed: boolean = false;

    @Output() selectionChange: EventEmitter<MatSelectChange>;

    constructor(
        private core: CoreService,
        private settingsService: SettingsService,
        private i18n: I18nService,
        private fb: FormBuilder
    ) {
        core.darkTheme.pipe(takeUntil(this.destroy)).subscribe(isDark => {
            this.checked = isDark;
        });

        this.currentLanguage = this.getLanguage();
        this.createForm();
    }

    ngOnInit() {
        this.settingsForm.valueChanges
            .pipe(takeUntil(this.destroy))
            .subscribe(val => {
                console.log("formulario cambiado");
                // if (JSON.stringify(this._post) != JSON.stringify(val))
                this._changed = true;
            });
    }

    private createForm() {
        this.settingsForm = this.fb.group({
            isDark: [false],
            language: [this.currentLanguage]
        });
        this._changed = false;
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (this._changed) this.save();
        return true;
    }

    save() {
        this.i18n.language = this.settingsForm.get("language").value;
        this.core.darkTheme.next(this.settingsForm.get("isDark").value);
        this.settingsService.saveSettings(this.settingsForm.value);
    }

    getLanguage(): string {
        return this.i18n.language;
    }

    get languages(): any {
        return this.i18n.supportedLanguages;
    }

    ngOnDestroy(): void {
        this.destroy.next();
    }
}
