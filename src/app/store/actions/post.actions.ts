import { Action } from '@ngrx/store';
import { Post } from '@app/models/post';

export enum PostActionTypes {
	SET_POSTS = '[Post] Set Posts',
	SET_POSTS_SUCCESS = '[Post] Set Posts Success',
	SET_POSTS_FAILURE = '[Post] Set Posts Failure',
	LOAD_POST = '[Post] Load Post',
	LOAD_POST_SUCCESS = '[Post] Load Post Ok',
	LOAD_POST_FAILURE = '[Post] Load Post Fail',
}

export class SetPosts implements Action {
	readonly type = PostActionTypes.SET_POSTS;
}

export class SetPostsSuccess implements Action {
	readonly type = PostActionTypes.SET_POSTS_SUCCESS;
	constructor(public payload: Post[]) { }
}

export class SetPostsFailure implements Action {
	readonly type = PostActionTypes.SET_POSTS_FAILURE;
	constructor(public payload: any) { }
}

export class LoadPost implements Action {
	readonly type = PostActionTypes.LOAD_POST;
	constructor(public payload: string) { }
}

export class LoadPostSuccess implements Action {
	readonly type = PostActionTypes.LOAD_POST_SUCCESS;
	constructor(public payload: any) { }
}

export class LoadPostFailure implements Action {
	readonly type = PostActionTypes.LOAD_POST_FAILURE;
	constructor(public payload: any) { }
}

export type PostActions = 
SetPosts 
| SetPostsSuccess 
| SetPostsFailure 
| LoadPost
| LoadPostSuccess
| LoadPostFailure
;
