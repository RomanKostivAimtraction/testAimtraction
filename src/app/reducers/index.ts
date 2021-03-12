import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { checkBoxModeReducer, IRows, SELECTROWS_KEY } from './main.reducer';

export interface State {
  [SELECTROWS_KEY]: IRows
}

export const reducers: ActionReducerMap<State> = {
  [SELECTROWS_KEY]: checkBoxModeReducer

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
