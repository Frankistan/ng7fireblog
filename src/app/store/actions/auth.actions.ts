import { Action } from '@ngrx/store';

// FUENTE: https://mherman.org/blog/authentication-in-angular-with-ngrx/
export enum AuthActionTypes {
    LOGIN = "[Auth] Login",
    LOGIN_SUCCESS = "[Auth] Login Success",
    LOGIN_FAILURE = "[Auth] Login Failure",
    SIGNUP = "[Auth] Signup",
    SIGNUP_SUCCESS = "[Auth] Signup Success",
    SET_AUTHENTICATED = "[Auth] Set authenticated",
    SET_UNAUTHENTICATED = "[Auth] Set unauthenticated"
}

export class SetAuthenticated implements Action {
    readonly type = AuthActionTypes.SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
    readonly type = AuthActionTypes.SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuthenticated | SetUnauthenticated;