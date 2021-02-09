import * as fromEstaciones from '../actions';



export interface EstacionesState {
    Estaciones: any[];
    loaded: boolean;
    loading: boolean;
    error: any;
    message: null,
}

const estadoInicial: EstacionesState = {
    Estaciones: [],
    loaded: false,
    loading: false,
    error: null,
    message: null,
};


export function estacionesReducer(state = estadoInicial, action: fromEstaciones.EstacionAccionesAlllast): EstacionesState {
    switch (action.type) {
        case fromEstaciones.CARGAR_ESTACIONES_All_LAST:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromEstaciones.CARGAR_ESTACIONES_All_LAST_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                Estaciones: [...action.Estaciones]
            };

        case fromEstaciones.CARGAR_ESTACIONES_All_LAST_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: { ...action.payload }
            };

        default:
            return state;

    }


}
