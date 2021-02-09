import { Action } from '@ngrx/store';

//obtener
export const CARGAR_ESTACIONES_All_LAST = '[Estaciones] Cargar Estaciones All_LAST';
export const CARGAR_ESTACIONES_All_LAST_FAIL = '[Estaciones] Cargar Estaciones All_LAST FAIL';
export const CARGAR_ESTACIONES_All_LAST_SUCCESS = '[Estaciones] Cargar Estaciones All_LAST SUCCESS';


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
                              