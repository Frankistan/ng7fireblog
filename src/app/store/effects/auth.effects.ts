import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '@app/shared';
import { Observable, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { AuthActionTypes, LogInSuccess,  LogIn, SetAuthenticatedUser, LogOut } from '../actions/auth.actions';
import { switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '@app/models/user';
import { Router } from '@angular/router';
import { SetSettings, SetFirebaseError, UnsetFirebaseError } from '../actions/layout.actions';


@Injectable()
export class AuthEffects {

	constructor(
		private actions$: Actions,
		private auth: AuthService,
		private _rtr: Router,
	) { }

	@Effect()
	loginUser: Observable<Action> = this.actions$.pipe(
		ofType<LogIn>(AuthActionTypes.LOGIN),
		map((action: LogIn) => action.payload),
		switchMap(credentials =>
			from(this.auth.login(credentials['email'], credentials['password']))
				.pipe(
					mergeMap(user => [ // EJECUTA 2 ACCIONES EN PARALELO
						new UnsetFirebaseError(),
						new LogInSuccess()
					]),
					catchError(error => of(new SetFirebaseError(error.code)))
				)
		));

	@Effect()
	setCurrentUser: Observable<Action> = this.actions$.pipe(
		ofType<LogInSuccess>(AuthActionTypes.LOGIN_SUCCESS),
		switchMap(_ =>
			this.auth.user
				.pipe(
					map(user => {
						if (user) {
							this._rtr.navigate(["/"]);
							return new SetAuthenticatedUser(user);
						} else {
							this._rtr.navigate(["/auth/login"]);
							return new LogOut();
						}

					}),
					catchError(error => of(new SetFirebaseError(error)))
				)
		));

	@Effect()
	loadSettings: Observable<Action> = this.actions$.pipe(
		ofType<SetAuthenticatedUser>(AuthActionTypes.SET_CURRENT_USER),
		map((action: SetAuthenticatedUser) => action.payload),
		map((user: User) => new SetSettings(user.settings))
	);
}
