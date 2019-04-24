import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
	MetaReducer
} from "@ngrx/store";

import * as fromLayout from "./layout/layout.reducer";
import * as fromAuth from "./auth/auth.reducer";
import * as fromPosts from "./posts/posts.reducer";
import { environment } from "@env/environment";

export interface State {
    layout: fromLayout.State;
    auth: fromAuth.State;
    posts: fromPosts.State;
}

export const reducers: ActionReducerMap<State> = {
    posts: fromPosts.postsReducer,
    layout: fromLayout.layoutReducer,
    auth: fromAuth.authReducer,
};

export const getLayoutState = createFeatureSelector<fromLayout.State>("layout");
export const getIsLoading = createSelector(
    getLayoutState,
    fromLayout.getIsLoading
);

export const getAuthState = createFeatureSelector<fromAuth.State>("auth");
export const getIsAuth = createSelector(
    getAuthState,
    fromAuth.getIsAuthenticated
);


export const getPostsState = createFeatureSelector<fromPosts.State>("posts");
export const getPostsList = createSelector(
    getPostsState,
    fromPosts.getPostsList
);
export const getSinglePost = createSelector(
    getPostsState,
    fromPosts.getSinglePost
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];