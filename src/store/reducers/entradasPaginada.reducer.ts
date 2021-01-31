import * as fromEstacionPaginada from '../actions';



export interface EntradasPaginadaState {
    Entradas: any;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: EntradasPaginadaState = {
    Entradas: null,
    loaded: false,
    loading: false,
    error: null
};


export function estacionPaginadaReducer(state = estadoInicial, action: fromEstacionPaginada.estacionEntradasPaginadasAcciones): EntradasPaginadaState  {
    switch (action.type) {

        case fromEstacionPaginada.CARGAR_ENTRADAS_ESTACION_PAGINADAS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromEstacionPaginada.CARGAR_ENTRADAS_ESTACION_PAGINADAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                Entradas: [ ...action.entradas ]
            };
            
        case fromEstacionPaginada.CARGAR_ENTRADAS_ESTACION_PAGINADAS_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    ...action.payload
                }
            };

        default:
            return state;

    }


}

