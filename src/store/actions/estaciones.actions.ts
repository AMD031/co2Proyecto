import { Action } from '@ngrx/store';

//obtener
export const CARGAR_ESTACIONES_All_ACTIVE = '[Estaciones] Cargar Estaciones All_ACTIVE';
export const CARGAR_ESTACIONES_FAIL = '[Estaciones] Cargar Estaciones FAIL';
export const CARGAR_ESTACIONES_SUCCESS = '[Estaciones] Cargar Estaciones SUCCESS';

export class CargarEstacionesAllCurrentActive implements Action {
    readonly type = CARGAR_ESTACIONES_All_ACTIVE;
}

export class CargarEstacionesFail implements Action {
    readonly type = CARGAR_ESTACIONES_FAIL;
    constructor(public payload: any) {}
}

export class CargarEstacionesSuccess implements Action {
    readonly type = CARGAR_ESTACIONES_SUCCESS;
    constructor(public Estaciones: any[]) {}
}


export type EstacionAcciones = CargarEstacionesAllCurrentActive |
                               CargarEstacionesFail |
                               CargarEstacionesSuccess;
