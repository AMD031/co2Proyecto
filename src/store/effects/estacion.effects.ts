import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as estacionActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Co2Service } from 'src/app/services/co2.service';

@Injectable()
export class EstacionEffects {
    constructor(
        private actions$: Actions,
        public co2: Co2Service
    ) {}

    @Effect()
    cargarEstacionId$ = this.actions$
        .pipe(
            ofType( estacionActions.CARGAR_ESTACION_ID ),
            switchMap( action => {
                const id = action['id'];
                    return this.co2.getStationsId(id)
                    .pipe(
                        map( estacion => new estacionActions.CargarEstacionSuccess(estacion) ),
                        catchError( error => of(new estacionActions.CargarEstacionFail(error)))
                    );
            })
        );
        






}
