import { Action } from "@ngrx/store";
import { Post } from "@app/models/post";

export enum PostsActionTypes {
    GET_POSTS = "[Post] Get posts list",
    GET_POST = "[Post] Get single post"
}

export class GetPosts implements Action {
    readonly type = PostsActionTypes.GET_POSTS;

    constructor(public payload: Post[]) {}
}

export class GetPost implements Action {
	readonly type = PostsActionTypes.GET_POST;
	constructor(public payload: Post) {}
}

export type PostsActions = GetPosts | GetPost;
