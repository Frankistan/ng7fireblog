import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { LocationService } from './../services/location.service';
import { NotificationService } from './../services/notification.service';
import { UserService } from './../services/user.service';
import { of as observableOf, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '@app/models/user';
import { merge } from 'lodash';
import * as firebase from 'firebase/app';

// FUENTE: https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8

@Injectable()
export class AuthService {
    private _user$: Observable<User>;
    private _isLoggedIn$: Observable<boolean>;
    private _authStateUser: User;

    constructor(
        private _afAuth: AngularFireAuth,
        private _db: AngularFirestore,
        private _router: Router,
        private _ntf: NotificationService,
        private _userSVC: UserService,
        private _locationSVC: LocationService
    ) {
        this._user$ = this._afAuth.authState.pipe(
            switchMap((fUser: firebase.User) => {
                if (!fUser) return observableOf(null);

                return this._db.doc<User>(`users/${fUser.uid}`).valueChanges()
                    .pipe(
                        map((user: User) => {
                            if(!user) return {};
                            const data: User = {
                                uid: fUser.uid,
                                lastSignInTime: fUser.metadata.lastSignInTime,
                                lastSignInLocation: user.lastSignInLocation || this._locationSVC.position || null,
                                providerId: fUser.providerData[0].providerId
                            };

                            return this._authStateUser = merge({}, user, data);
                        })
                    );
            })
        );

        this._isLoggedIn$ = this._afAuth.authState.pipe(
            map<firebase.User, boolean>((user: firebase.User) => {
                return user && user != undefined;
            }));
    }

    login(email: string, password: string): Promise<any> {

        return this._afAuth.auth.signInWithEmailAndPassword(email, password)
            .then(_ => { this._router.navigate(['/']); })
            .catch(error => {
                this.errorHandler(error.code)
            });
    }

    signup(user: User) {
        return this._afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
            .then((firebaseUser: any) => {

                let fUser = firebaseUser.user;

                const data: User = {
                    uid: fUser.uid,
                    displayName: user.displayName,
                    email: fUser.email,
                    lastSignInTime: fUser.metadata.lastSignInTime,
                    lastSignInLocation: this._locationSVC.position,
                    photoURL: user.photoURL,
                    profileURL: "",
                    providerId: fUser.providerData[0].providerId
                };

                this._userSVC.create(data);
                this._ntf.open('toast.signup');
                this._router.navigate(['/posts']);
            })
            .catch(error => this.errorHandler(error.code));
    }

    logout() {

        const data: User = {
            uid: this._authStateUser.uid,
            lastSignInLocation: this._locationSVC.position,
            lastSignInTime: this.timestamp || this._authStateUser.lastSignInTime
        };

        this._afAuth.auth.signOut()
            .then(success => { 
                this._userSVC.update(data); 
                this._router.navigate(['/login']); })
            .catch(error => this.errorHandler(error.code));
    }

    resetPassword(email: string) {
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(email)
            .then(success => { this._ntf.open('toast.reset_pwd', 'toast.close'); })
            .catch(error => { this._ntf.open('toast.firebase.' + error.code, 'toast.close'); });
    }

    loginWithProvider(providerName: string): Promise<void> {

        let provider = null;
        switch (providerName) {
            case 'google':
                provider = new firebase.auth.GoogleAuthProvider();
                break;
            case 'facebook':
                provider = new firebase.auth.FacebookAuthProvider();
                break;
            case 'github':
                provider = new firebase.auth.GithubAuthProvider();
                break;
            default: ;

        }
        return this.oAuthLogin(provider);
    }

    private oAuthLogin(provider) {
        return this._afAuth.auth.signInWithPopup(provider)
            .then((credential:any) => {
                let user = credential.user;

                const data: User = {
                    uid: user.uid,
                    email: credential.additionalUserInfo.profile.email || user.email || "",
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    // location: this._locationSVC.position,
                    lastSignInTime: user.metadata.lastSignInTime,
                    profileURL: credential.additionalUserInfo.profile.html_url || credential.additionalUserInfo.profile.link
                };
                this._userSVC.create(data);
                this._router.navigate(['/posts']);
            })
            .catch(error => this.errorHandler(error.code));
    }

    get user(): Observable<User> {
        return this._user$;
    }

    get isAuthenticated(): Observable<boolean> {
        return this._isLoggedIn$;
    }

    private errorHandler(error: any) {
        console.log('auth SVC error: ', error);

        this._ntf.open('toast.firebase.' + error, 'toast.close');
    }

    get timestamp() {
        return firebase.firestore.FieldValue.serverTimestamp();
    }
}
