import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as estacionActions from '../actions';
import { of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Co2Service } from 'src/app/services/co2.service';

@Injectable()
export class EntradasPaginadaEffects {
    constructor(
        private actions$: Actions,
        public co2: Co2Service
    ) { }

    @Effect()
    cargarEstacionId$ = this.actions$
        .pipe(
            ofType(estacionActions.CARGAR_ENTRADAS_ESTACION_PAGINADAS),
            switchMap(action => {
                const name = action['name'];
                const id = action['id'];

                            
                return this.co2.getStationsNamePage(name, id)
                    .pipe(
                        map(entradas => new estacionActions.CargarEstacionEntradasSuccess(entradas as any)),
                        catchError(error => of(new estacionActions.CargarEstacionEntradasFail(error)))
                    );
            })
        );







}
