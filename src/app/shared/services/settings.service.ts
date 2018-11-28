import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from './../services/auth.service';
import { NotificationService } from './../services/notification.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '@app/models/user';
import { merge } from 'lodash';

@Injectable()
export class SettingsService {

    loadSettings: BehaviorSubject<any> = new BehaviorSubject({});
    user: User;
    userRef: AngularFirestoreDocument<User>;

    constructor(
        private _auth: AuthService,
        private _db: AngularFirestore,
        private _ntf: NotificationService,
    ) {
        this._auth.user.subscribe((user) => {
            let settings = !user ? {} : user.settings;
            this.load(settings);
            if (!user) return;
            this.user = user;
            this.userRef = this._db.doc(`users/${user.uid}`);
        });
    }


    private load(databaseSettings = {}) {
        let defaults = {
            language: window.navigator.language.toLocaleLowerCase().split("-")[0],
            isDark: false
        };

        let localSettings = JSON.parse(localStorage.getItem('settings')) || {};

        let userSettings = merge({}, localSettings, databaseSettings);

        let settings = merge({}, defaults, userSettings);

        localStorage.setItem('settings', JSON.stringify(settings));

        this.loadSettings.next(settings);
    }

    saveSettings(newSettings: any) {
        let localSettings = JSON.parse(localStorage.getItem('settings')) || {};

        let settings = merge({}, localSettings, newSettings);

        localStorage.setItem('settings', JSON.stringify(settings));

        if (this.user) {
            this.user.settings = settings;
            this.userRef.set(this.user)
                .then(success => {
                    this._ntf.open('toast.settings_saved', 'toast.close');
                    this.loadSettings.next(settings);
                })
                .catch(error => { this._ntf.open('toast.firebase.' + error.code, 'toast.close'); });
        }
    }
}
