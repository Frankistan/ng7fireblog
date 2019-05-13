import { AppState } from './app.reducer';
import { Post } from '@app/models/post';
import { PostActions, PostActionTypes } from '../actions/post.actions';

export interface PostsState {
	posts: Post[];
	post: Post | null;
}

export const initialState: PostsState = {
	posts: [],
	post: null
};

export interface State extends AppState {
	posts: PostsState
}

export function reducer(state = initialState, action: PostActions): PostsState {
	switch (action.type) {
		case PostActionTypes.SET_POSTS_SUCCESS:
			return {
				...state,
				posts: action.payload,
			};
		case PostActionTypes.SET_POST:
			return {
				...state,
				post: action.payload,
			};
		default:
			return state;
	}
}
