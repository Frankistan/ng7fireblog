import { LayoutActions, LayoutActionTypes } from "./layout.actions";

export interface State {
    isLoading: boolean;
}

const initialState: State = {
    isLoading: false
};

export function layoutReducer(state = initialState, action: LayoutActions) {
    switch (action.type) {
        case LayoutActionTypes.START_LOADING:
            return {
                isLoading: true
            };
        case LayoutActionTypes.STOP_LOADING:
            return {
                isLoading: false
            };
        default:
            return state;
    }
}

export const getIsLoading = (state: State) => state.isLoading;
