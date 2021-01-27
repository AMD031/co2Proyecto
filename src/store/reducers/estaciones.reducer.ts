import * as fromEstaciones from '../actions';



export interface EstacionesState {
    Estaciones: any[];
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: EstacionesState = {
    Estaciones: [],
    loaded: false,
    loading: false,
    error: null
};


export function estacionesReducer( state = estadoInicial, action: fromEstaciones.EstacionAcciones ): EstacionesState {
    switch ( action.type ) {
        case fromEstaciones.CARGAR_ESTACIONES_All_ACTIVE:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromEstaciones.CARGAR_ESTACIONES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                Estaciones: [...action.Estaciones]
            };

        case fromEstaciones.CARGAR_ESTACIONES_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error:{ ...action.payload}
            };


        default:
            return state;

    }


}
