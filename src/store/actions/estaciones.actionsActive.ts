import { Action } from '@ngrx/store';

//obtener
export const CARGAR_ESTACIONES_All_ACTIVE = '[Estaciones] Cargar Estaciones Active';
export const CARGAR_ESTACIONES_All_ACTIVE_FAIL = '[Estaciones] Cargar Estaciones Active FAIL';
export const CARGAR_ESTACIONES_All_ACTIVE_SUCCESS = '[Estaciones] Cargar Estaciones Active SUCCESS';


export class CargarEstacionesAllActive implements Action {
    readonly type = CARGAR_ESTACIONES_All_ACTIVE;
}

export class CargarEstacionesAllActiveFail implements Action {
    readonly type = CARGAR_ESTACIONES_All_ACTIVE_FAIL;
    constructor(public payload: any) {}
}

export class CargarEstacionesAllActiveSuccess implements Action {
    readonly type = CARGAR_ESTACIONES_All_ACTIVE_SUCCESS;
    constructor(public Estaciones: any[]) {}
}


export type EstacionAccionesAllActive  =  CargarEstacionesAllActive |
                                          CargarEstacionesAllActiveFail  |
                                          CargarEstacionesAllActiveSuccess;
                              