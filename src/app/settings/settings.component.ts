import { Component } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { FormGroup, FormBuilder } from "@angular/forms";
import { CoreService, SettingsService, I18nService } from "@app/shared";
import { takeUntil } from "rxjs/operators";

@Component({
    selector: "app-settings",
    templateUrl: "./settings.component.html",
    styleUrls: ["./settings.component.css"]
})
export class SettingsComponent {

    settingsForm: FormGroup;
    private _changed: boolean = false;
    private _destroy = new Subject<any>();

    constructor(
        private core: CoreService,
        private settingsService: SettingsService,
        private i18n: I18nService,
        private fb: FormBuilder
    ) {

        this.createForm();
        core.darkTheme.pipe(takeUntil(this._destroy)).subscribe(isDark => {
            this.settingsForm.patchValue({ isDark: isDark } || {});
            this._changed = false;
        });
    }

    ngOnInit() {
        this.settingsForm.valueChanges
            .pipe(takeUntil(this._destroy))
            .subscribe(_ => {
                this._changed = true;
            });
    }

    private createForm() {
        this.settingsForm = this.fb.group({
            isDark: [false],
            language: [this.language]
        });
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

    get language(): string {
        return this.i18n.language;
    }

    get languages(): any {
        return this.i18n.supportedLanguages;
    }

    ngOnDestroy(): void {
        this._destroy.next();
    }
}
