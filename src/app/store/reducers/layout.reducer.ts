import { Action } from '@ngrx/store';
import { LayoutActionTypes } from '../actions/layout.actions';


export interface State {
	isDarkTheme: boolean;
	isListView: boolean;
	isLoading: boolean;
	isScrolling: boolean;
	isSearching: boolean;
	isSearchOpened: boolean;
	language: string;
}

export const initialState: State = {
	isDarkTheme: false,
	isListView: true,
	isLoading: false,
	isScrolling: false,
	isSearching: false,
	isSearchOpened: false,
	language: "es",
};

export function reducer(state = initialState, action: Action): State {
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