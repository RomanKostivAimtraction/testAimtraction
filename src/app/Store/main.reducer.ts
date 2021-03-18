import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from '@ngrx/store';
import { IData, IRowData } from '../shared/interfaces/main';

export const SELECTROWS_KEY = 'data';

export const countSelectedRows = createAction('[MAIN] countSelectedRows', props<{ countRow: number }>());

export const requeftFromYoutube = createAction('[MAIN] data Form Youtube', props<{ searchValue: string }>())
export const requeftFromYoutubeSuccess = createAction('[MAIN] data Form Youtube success', props<{data: IRowData[]}>())
export const requeftFromYoutubeError = createAction('[MAIN] data Form Youtube error', props<{ err: any }>())


export const dataState: IData = {
    countAllRows: 0,
    countSelectedRows: 0,
    items: [],
    error: null,
    isLoading: false
};



export const mainReducer = createReducer(
    dataState,
    on(countSelectedRows, (state, action) => ({
        ...state,
        countSelectedRows: action.countRow
    })),

    on(requeftFromYoutube, (state, action) => ({
        ...state,
        isLoading: true
    })),

    on(requeftFromYoutubeSuccess, (state, action) => ({
        ...state,
        items: action.data,
        isLoading: false
    }))
);



export const futureSelector = createFeatureSelector<IData>(SELECTROWS_KEY);

export const countAllRowsSelector = createSelector(
    futureSelector, state => state.items.length
);

export const countSelectedRowsSelector = createSelector(
    futureSelector, state => state.countSelectedRows
);

export const YTdataSelector = createSelector(
    futureSelector, state => state.items
);

export const spinerIsLoadingSelector = createSelector(
    futureSelector, state => state.isLoading
);