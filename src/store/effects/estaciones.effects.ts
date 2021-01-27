import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as estacionesActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { Co2Service } from 'src/app/services/co2.service';

@Injectable()
export class EstacionesEffects {

    constructor(
        private actions$: Actions,
        public co2: Co2Service
    ) { }
    @Effect()
    cargarEstaciones$ = this.actions$
        .pipe(
            ofType(estacionesActions.CARGAR_ESTACIONES_All_ACTIVE),
            switchMap(() => {
                return this.co2.getAllCurrentActive()
                    .pipe(
                        map(estaciones => new estacionesActions.CargarEstacionesSuccess(estaciones as any)),
                        catchError(error => of(new estacionesActions.CargarEstacionesFail(error)))
                    );
            })
        );







}