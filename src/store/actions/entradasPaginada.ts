import { Action } from '@ngrx/store';

//Obtencion
export const CARGAR_ENTRADAS_ESTACION_PAGINADAS = '[EntradasPaginada] Cargar estacion entradas paginada Name';
export const CARGAR_ENTRADAS_ESTACION_PAGINADAS_FAIL = '[EntradasPaginada] Cargar estacion entradas paginada FAIL';
export const CARGAR_ENTRADAS_ESTACION_PAGINADAS_SUCCESS = '[EntradasPaginada] Cargar estacion entradas paginada SUCCESS';

//Borrado
export const BORRAR_ENTRADAS_ESTACION = '[Estaciones] Borrar Entradas Estaciones ';
export const BORRAR_ENTRADAS_ESTACION_FAIL = '[Estaciones] Borrar  Entradas Estaciones Fail';
export const BORRAR_ENTRADAS_ESTACION_SUCCESS = '[Estaciones] Borrar Entradas SUCCESS';

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


//clases Borrado--------------------------------------------------
export class BorrarEntradasEstacion implements Action {
    readonly type = BORRAR_ENTRADAS_ESTACION;
    constructor(public name:string) {}
}

export class BorrarEntradasEstacionSuccess implements Action {
    readonly type = BORRAR_ENTRADAS_ESTACION_SUCCESS;
    constructor(public payload: any) {}
}

export class BorrarEntradasEstacionfail implements Action {
    readonly type = BORRAR_ENTRADAS_ESTACION_FAIL;
    constructor(public payload: any) {}
}


export type estacionEntradasPaginadasAcciones = CargarEstacionEntradasName |
                                                CargarEstacionEntradasFail |
                                                CargarEstacionEntradasSuccess|
                                                BorrarEntradasEstacion|
                                                BorrarEntradasEstacionSuccess|  
                                                BorrarEntradasEstacionfail