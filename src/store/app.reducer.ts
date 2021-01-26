
import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';



export interface AppState {
    login: reducers.LoginState;
    estacion: reducers.EstacionState;
    estaciones: reducers.EstacionesState;
}

export const appReducers: ActionReducerMap<AppState> = {
    login: reducers.loginReducer,
    estacion: reducers.estacionReducer,
    estaciones: reducers.estacionesReducer,
};
