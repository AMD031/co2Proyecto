
import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';



export interface AppState {
    login: reducers.LoginState;
    estacion: reducers.EstacionState;
    estacionesLastAll: reducers.EstacionesState;
    estacionesAllActive: reducers.EstacionesActiveState;
    EntradasPaginadas: reducers.EntradasPaginadaState;


}

export const appReducers: ActionReducerMap<AppState> = {
    login: reducers.loginReducer,
    estacion: reducers.estacionReducer,
    estacionesLastAll: reducers.estacionesReducer,
    EntradasPaginadas: reducers.estacionPaginadaReducer,
    estacionesAllActive: reducers.estacionesActiveReducer,
};
