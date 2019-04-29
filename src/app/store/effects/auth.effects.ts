import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '@app/shared';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { AuthActionTypes, LogInSuccess, LogInFailure, LogIn, SetAuthenticatedUser, LogOut } from '../actions/auth.actions';
import { switchMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '@app/models/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { merge } from 'lodash';
import { Router } from '@angular/router';


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
		switchMap((payload: any) =>
			of(this.auth.login(payload['email'], payload['password']))
				.pipe(
					map(user => new LogInSuccess()),
					catchError(error => of(new LogInFailure(error)))
				)
		));

	@Effect()
	setCurrentUser: Observable<Action> = this.actions$.pipe(
		ofType<LogInSuccess>(AuthActionTypes.LOGIN_SUCCESS),
		switchMap( _ =>
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
					catchError(error => of(new LogInFailure(error)))
				)
		));
}
