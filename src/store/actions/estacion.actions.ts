import { Action } from '@ngrx/store';


export const CARGAR_ESTACION = '[Estacion] Cargar estacion';
export const CARGAR_ESTACION_FAIL = '[Estacion] Cargar estacion FAIL';
export const CARGAR_ESTACION_SUCCESS = '[Estacion] Cargar estacion SUCCESS';

export class CargarEstacion implements Action {
    readonly type = CARGAR_ESTACION;
    constructor(public id: number) { }
}

export class CargarEstacionFail implements Action {
    readonly type = CARGAR_ESTACION_FAIL;
    constructor(public payload: any) { }
}

export class CargarEstacionSuccess implements Action {
    readonly type = CARGAR_ESTACION_SUCCESS;
    constructor(public estacion: any) { }
}


export type estacionAcciones = CargarEstacion |
                               CargarEstacionFail |
                               CargarEstacionSuccess;
