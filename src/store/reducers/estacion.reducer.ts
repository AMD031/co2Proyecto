import * as fromEstacion from '../actions';



export interface EstacionState {
    Estacion: any;
    loaded: boolean;
    loading: boolean;
    error: any;
}

const estadoInicial: EstacionState = {
    Estacion: null,
    loaded: false,
    loading: false,
    error: null
};


export function estacionReducer(state = estadoInicial, action: fromEstacion.estacionAcciones): EstacionState {
    switch (action.type) {

        case fromEstacion.CARGAR_ESTACION_ID:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromEstacion.REINICIAR_ESTACION:
            return {
                Estacion: null,
                loaded: false,
                loading: false,
                error: null
            };

     
        case fromEstacion.CARGAR_ESTACION_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                Estacion: { ...action.estacion }
            };

        case fromEstacion.CARGAR_ESTACION_FAIL:
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

