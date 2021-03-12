import { createAction, createFeatureSelector, createReducer, createSelector, on, props } from "@ngrx/store";

export const SELECTROWS_KEY = 'selectRows'

export const countAllRows = createAction('[MAIN] countAllRows', props<{ countRow: number }>());
export const countSelectedRows = createAction('[MAIN] countSelectedRows', props<{ countRow: number }>());

export interface IRows {
    countAllRows: number,
    countSelectedRows: number,
}

export const rowsState: IRows = {
    countAllRows: 0,
    countSelectedRows: 0,
}

export const checkBoxModeReducer = createReducer(
    rowsState,
    on(countAllRows, (state, action) => ({
        ...state,
        countAllRows: action.countRow
    })),
    on(countSelectedRows, (state, action) => ({       
        ...state,
        countSelectedRows: action.countRow
    }))
)

export const futureSelector = createFeatureSelector<IRows>(SELECTROWS_KEY);

export const countAllRowsSelector = createSelector(
    futureSelector, state => state.countAllRows
)

export const countSelectedRowsSelector = createSelector(
    futureSelector, state => state.countSelectedRows
)