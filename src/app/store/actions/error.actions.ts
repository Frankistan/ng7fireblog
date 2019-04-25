import { Action } from '@ngrx/store';

export enum ErrorActionTypes {
  LoadErrors = '[Error] Load Errors',
  
  
}

export class LoadErrors implements Action {
  readonly type = ErrorActionTypes.LoadErrors;
}


export type ErrorActions = LoadErrors;
