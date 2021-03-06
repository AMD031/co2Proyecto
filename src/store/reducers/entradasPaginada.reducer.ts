import * as fromEstacionPaginada from '../actions';



export interface EntradasPaginadaState {
    Entradas: any;
    loaded: boolean;
    loading: boolean;
    error: any;
    message: any;
}

const estadoInicial: EntradasPaginadaState = {
    Entradas: null,
    loaded: false,
    loading: false,
    error: null,
    message: null,
};


export function estacionPaginadaReducer(state = estadoInicial, action: fromEstacionPaginada.estacionEntradasPaginadasAcciones): EntradasPaginadaState {
    switch (action.type) {

        case fromEstacionPaginada.CARGAR_ENTRADAS_ESTACION_PAGINADAS:
            return {
                ...state,
                loading: true,
                error: null,
                message: null,
            };

        case fromEstacionPaginada.CARGAR_ENTRADAS_ESTACION_PAGINADAS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                Entradas: [...action.entradas]
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

        case fromEstacionPaginada.BORRAR_ENTRADAS_ESTACION:
            return {
                ...state,
                loading: true,
            }

        case fromEstacionPaginada.BORRAR_ENTRADAS_ESTACION_SUCCESS:

            return {
                ...state,
                Entradas: [],
                message: { ...action.payload },
                loading: false,
                loaded:false,
             
            }

        case fromEstacionPaginada.BORRAR_ENTRADAS_ESTACION_FAIL:
            return {
                ...state,
                error: { ...action.payload },
                loading: false,
                loaded:  false,
            }
        default:
            return state;

    }


}

