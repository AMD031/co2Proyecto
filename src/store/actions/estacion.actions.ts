import { Action } from '@ngrx/store';

//obtencion
export const CARGAR_ESTACION_ID = '[Estacio] Cargar estacion entrada ID';
// export const CARGAR_ESTACION_NAME = '[Estacion] Cargar estacion NAME';
export const CARGAR_ESTACION_FAIL = '[Estacion] Cargar estacion entrada FAIL';
export const CARGAR_ESTACION_SUCCESS = '[Estacion] Cargar estacion entrada SUCCESS';
export const REINICIAR_ESTACION = '[Estacion] Reiniciar estacion';


//clases obtencion
export class CargarEstacionId implements Action {
    readonly type = CARGAR_ESTACION_ID;
    constructor(public id: number) {}
}

export class CargarEstacionFail implements Action {
    readonly type = CARGAR_ESTACION_FAIL;
    constructor(public payload: any) {}
}

export class CargarEstacionSuccess implements Action {
    readonly type = CARGAR_ESTACION_SUCCESS;
    constructor(public estacion: any) {}
}
export class ReiniciarEstacion implements Action {
    readonly type = REINICIAR_ESTACION;
  
}




export type estacionAcciones =  CargarEstacionId|
                                CargarEstacionFail|
                                CargarEstacionSuccess|
                                ReiniciarEstacion;