import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '@env/environment';
import * as fromLayout from "./layout.reducer";
import * as fromAuth from "./auth.reducer";

export interface State {
	layout: fromLayout.State;
    auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
	layout: fromLayout.reducer,
    auth: fromAuth.reducer,
};


// Feature Selectors
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


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
