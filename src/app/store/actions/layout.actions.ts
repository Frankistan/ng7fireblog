import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
	START_LOADING = "[Layout] Start loading",
	STOP_LOADING = "[Layout] Stop loading",
	SET_SETTINGS = "[Layout] Set Layout settings",
	SET_SETTINGS_SUCCESS = "[Layout] Set Layout settings success",
	SET_FIREBASE_ERROR = "[Layout] Set Firebase Error",
	UNSET_FIREBASE_ERROR = "[Layout] Unset Firebase Error",
}

export class StartLoading implements Action {
	readonly type = LayoutActionTypes.START_LOADING;
}

export class StopLoading implements Action {
	readonly type = LayoutActionTypes.STOP_LOADING;
}

export class SetSettings implements Action {
	readonly type = LayoutActionTypes.SET_SETTINGS;
	constructor(public payload: any) { }
}

export class SetSettingsSuccess implements Action {
	readonly type = LayoutActionTypes.SET_SETTINGS_SUCCESS;
}

export class SetFirebaseError implements Action {
	readonly type = LayoutActionTypes.SET_FIREBASE_ERROR;
	constructor(public payload: any) { }
}
export class UnsetFirebaseError implements Action {
	readonly type = LayoutActionTypes.UNSET_FIREBASE_ERROR;
}

export type LayoutActions = 
StartLoading | 
StopLoading | 
SetSettings | 
SetSettingsSuccess |
SetFirebaseError |
UnsetFirebaseError;
