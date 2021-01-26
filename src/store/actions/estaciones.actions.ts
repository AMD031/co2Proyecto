import { Action } from '@ngrx/store';


export const CARGAR_ESTACIONES = '[Estaciones] Cargar Estaciones';
export const CARGAR_ESTACIONES_FAIL = '[Estaciones] Cargar Estaciones FAIL';
export const CARGAR_ESTACIONES_SUCCESS = '[Estaciones] Cargar Estaciones SUCCESS';

export class CargarEstaciones implements Action {
    readonly type = CARGAR_ESTACIONES;
}

export class CargarEstacionesFail implements Action {
    readonly type = CARGAR_ESTACIONES_FAIL;
    constructor(public payload: any) {}
}

export class CargarEstacionesSuccess implements Action {
    readonly type = CARGAR_ESTACIONES_SUCCESS;
    constructor(public Estaciones: any[]) {}
}


export type EstacionAcciones = CargarEstaciones |
                               CargarEstacionesFail |
                               CargarEstacionesSuccess;
