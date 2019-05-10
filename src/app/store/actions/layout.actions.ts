import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
	START_LOADING = "[Layout] Start loading",
	STOP_LOADING = "[Layout] Stop loading",
	SET_SETTINGS = "[Layout] Set Layout settings",
	SET_SETTINGS_SUCCESS = "[Layout] Set Layout settings success",
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

export type LayoutActions = StartLoading | StopLoading | SetSettings | SetSettingsSuccess;
