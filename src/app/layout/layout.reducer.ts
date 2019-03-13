import { LayoutActions, LayoutActionTypes } from "./layout.actions";

export interface State {
    isDarkTheme: boolean; //     darkTheme
    isListView: boolean;
    isLoading: boolean;
    isScrolling: boolean;
    isSearching: boolean;
    isSearchOpened: boolean;
    language: string;
}

const initialState: State = {
    isDarkTheme: false,
    isListView: true,
    isLoading: false,
    isScrolling: false,
    isSearching: false,
    isSearchOpened: false,
    language: "es",
};

export function layoutReducer(state = initialState, action: LayoutActions) {
    switch (action.type) {
        case LayoutActionTypes.START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case LayoutActionTypes.STOP_LOADING:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}

export const getIsLoading = (state: State) => state.isLoading;
