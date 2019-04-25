import { Action } from '@ngrx/store';
import { AuthActionTypes } from '../actions/auth.actions';


export interface State {
	isAuthenticated: boolean;
}

export const initialState: State = {
	isAuthenticated: false
};

export function reducer(state = initialState, action: Action): State {
	switch (action.type) {
		case AuthActionTypes.SET_AUTHENTICATED:
			return {
				...state,
				isAuthenticated: true
			};
		case AuthActionTypes.SET_UNAUTHENTICATED:
			return {
				...state,
				isAuthenticated: false
			};
		default:
			return state;
	}
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;