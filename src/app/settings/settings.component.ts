import { Component, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSlideToggleChange, MatSelectChange } from '@angular/material';
import { CoreService, SettingsService } from '@app/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
    checked = JSON.parse(localStorage.getItem('settings')).isDark;
    selectedLanguage: string = JSON.parse(localStorage.getItem('settings')).language;

    destroy = new Subject<any>();

    languages = [
        { value: 'es', viewValue: 'Español' },
        { value: 'en', viewValue: 'English' }
    ];

    @Output() selectionChange: EventEmitter<MatSelectChange>;

    constructor(
        private coreSrv:CoreService,
        private translate: TranslateService,
        private settingsService:SettingsService,
    ) {
        coreSrv.darkTheme
            .pipe(takeUntil(this.destroy))
            .subscribe( isDark =>{
                this.checked =  isDark ;
            });

        coreSrv.language
            .pipe(takeUntil(this.destroy))
            .subscribe(lang => {
                this.selectedLanguage = lang;
            });
    }

    switchTheme(event: MatSlideToggleChange) {
        let settings = {
            isDark: event.checked
        }

        this.coreSrv.darkTheme.next(event.checked);
        this.settingsService.saveSettings(settings);
    }

    switchLanguage(event: MatSelectChange) {
        let settings = {
            language: event.value
        };

        this.coreSrv.language.next(event.value);
        this.settingsService.saveSettings(settings);
    }

    ngOnDestroy(): void {
		this.destroy.next();
	}
}
