import * as fromLayout from "./layout/layout.reducer";
import * as fromAuth from "./auth/auth.reducer";
import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector
} from "@ngrx/store";

export interface State {
    layout: fromLayout.State;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
    layout: fromLayout.layoutReducer,
    auth: fromAuth.authReducer
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
