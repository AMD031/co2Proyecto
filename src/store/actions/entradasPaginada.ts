import { Action } from '@ngrx/store';

//obtencion
export const CARGAR_ENTRADAS_ESTACION_PAGINADAS = '[EntradasPaginada] Cargar estacion entradas paginada ID';
export const CARGAR_ENTRADAS_ESTACION_PAGINADAS_FAIL = '[EntradasPaginada] Cargar estacion entradas paginada FAIL';
export const CARGAR_ENTRADAS_ESTACION_PAGINADAS_SUCCESS = '[EntradasPaginada] Cargar estacion entradas paginada SUCCESS';


//clases obtencion
export class CargarEstacionEntradasName implements Action {
    readonly type = CARGAR_ENTRADAS_ESTACION_PAGINADAS;
    constructor(public name: string, public id: number) { }
}

export class CargarEstacionEntradasFail implements Action {
    readonly type = CARGAR_ENTRADAS_ESTACION_PAGINADAS_FAIL;
    constructor(public payload: any) { }
}

export class CargarEstacionEntradasSuccess implements Action {
    readonly type = CARGAR_ENTRADAS_ESTACION_PAGINADAS_SUCCESS;
    constructor(public entradas: any[]) { }
}

export type estacionEntradasPaginadasAcciones = CargarEstacionEntradasName |
                                                CargarEstacionEntradasFail |
                                                CargarEstacionEntradasSuccess;
