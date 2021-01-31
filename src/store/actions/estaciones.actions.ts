import { Action } from '@ngrx/store';

//obtener
export const CARGAR_ESTACIONES_All_LAST = '[Estaciones] Cargar Estaciones All_ACTIVE';
export const CARGAR_ESTACIONES_All_LAST_FAIL = '[Estaciones] Cargar Estaciones FAIL';
export const CARGAR_ESTACIONES_All_LAST_SUCCESS = '[Estaciones] Cargar Estaciones SUCCESS';

export class CargarEstacionesAlllast implements Action {
    readonly type = CARGAR_ESTACIONES_All_LAST;
}

export class CargarEstacionesAlllastFail implements Action {
    readonly type = CARGAR_ESTACIONES_All_LAST_FAIL;
    constructor(public payload: any) {}
}

export class CargarEstacionesAlllastSuccess implements Action {
    readonly type = CARGAR_ESTACIONES_All_LAST_SUCCESS;
    constructor(public Estaciones: any[]) {}
}


export type EstacionAccionesAlllast  =  CargarEstacionesAlllast |
                                        CargarEstacionesAlllastFail  |
                                        CargarEstacionesAlllastSuccess;
