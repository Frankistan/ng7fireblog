import { Action } from '@ngrx/store';

export enum PostActionTypes {
	LoadPosts = '[Post] Load Posts',
	SET_POSTS = '[Post] Set Posts',
	SET_POSTS_SUCCESS = '[Post] Set Posts Success',
	SET_POSTS_FAILURE = '[Post] Set Posts Failure',
	SET_POST = '[Post] Set Post',
}

export class LoadPosts implements Action {
	readonly type = PostActionTypes.LoadPosts;
}

export class SetPosts implements Action {
	readonly type = PostActionTypes.SET_POSTS;
}

export class SetPostsSuccess implements Action {
	readonly type = PostActionTypes.SET_POSTS_SUCCESS;
	constructor(public payload: any) { }
}

export class SetPostsFailure implements Action {
	readonly type = PostActionTypes.SET_POSTS_FAILURE;
	constructor(public payload: any) { }
}

export class SetPost implements Action {
	readonly type = PostActionTypes.SET_POST;
	constructor(public payload: any) { }
}

export type PostActions = 
LoadPosts | 
SetPosts | 
SetPostsSuccess |
SetPostsFailure |
SetPost;
