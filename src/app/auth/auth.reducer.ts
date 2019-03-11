import { AuthActions, AuthActionTypes } from "./auth.actions";

export interface State {
    isAuthenticated: boolean;
}

const initialState: State = {
    isAuthenticated: false
};

export function authReducer(state = initialState, action: AuthActions) {
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
