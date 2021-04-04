import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { IData } from '../shared/interfaces/main';
import { mainReducer, SELECTROWS_KEY } from './main.reducer';

export interface State {
  [SELECTROWS_KEY]: IData;

}

export const reducers: ActionReducerMap<State> = {
  [SELECTROWS_KEY]: mainReducer,

};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
