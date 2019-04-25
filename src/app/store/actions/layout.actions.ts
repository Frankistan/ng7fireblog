import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
    START_LOADING = "[Layout] Start loading",
    STOP_LOADING = "[Layout] Stop loading"
}

export class StartLoading implements Action {
    readonly type = LayoutActionTypes.START_LOADING;
}

export class StopLoading implements Action {
    readonly type = LayoutActionTypes.STOP_LOADING;
}

export type LayoutActions = StartLoading | StopLoading;
