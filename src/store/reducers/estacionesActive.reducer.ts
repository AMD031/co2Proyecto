import * as fromEstaciones from '../actions';



export interface EstacionesActiveState {
    Estaciones: any[];
    loaded: boolean;
    loading: boolean;
    error: any;
    message: null,
}

const estadoInicial: EstacionesActiveState = {
    Estaciones: [],
    loaded: false,
    loading: false,
    error: null,
    message: null,
};


export function estacionesActiveReducer(state = estadoInicial, action: fromEstaciones.EstacionAccionesAllActive): EstacionesActiveState {
    switch (action.type) {
        case fromEstaciones.CARGAR_ESTACIONES_All_ACTIVE:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromEstaciones.CARGAR_ESTACIONES_All_ACTIVE_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                Estaciones: [...action.Estaciones]
            };

        case fromEstaciones.CARGAR_ESTACIONES_All_ACTIVE_FAIL:
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
