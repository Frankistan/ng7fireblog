import { PostsActions, PostsActionTypes } from "./posts.actions";
import { Post } from "@app/models/post";

export interface State {
	posts: Post[];
	post: Post;
}

const initialState: State = {
    posts: [],
	post: null
};

export function postsReducer(state = initialState, action: PostsActions) {
    switch (action.type) {
        case PostsActionTypes.GET_POSTS:
            return {
                ...state,
                posts: action.payload
            };
        case PostsActionTypes.GET_POST:
            return {
                ...state,
                post: action.payload
            };
        default:
            return state;
    }
}

export const getPostsList = (state: State) => state.posts;
export const getSinglePost = (state: State) => state.post;
