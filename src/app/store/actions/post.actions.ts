import { Action } from '@ngrx/store';

export enum PostActionTypes {
  LoadPosts = '[Post] Load Posts',
  
  
}

export class LoadPosts implements Action {
  readonly type = PostActionTypes.LoadPosts;
}


export type PostActions = LoadPosts;
