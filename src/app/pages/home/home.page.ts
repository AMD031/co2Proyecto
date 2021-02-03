import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Co2Service } from 'src/app/services/co2.service';
import { MensajesalertasService } from 'src/app/services/mensajesalertas.service';
import { UtilesService } from 'src/app/services/utiles.service';
import { CargarEstacionesAlllast } from 'src/store/actions';
import { AppState } from 'src/store/app.reducer';
import * as fromEstacion from '../../../store/actions'
import { DetallesPage } from '../detalles/detalles.page';
import * as d3 from "d3";


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private estaciones = [];
  private loading: boolean;
  private loaded: boolean;
  svg: any;
  x: any;
  y: any





  constructor(
    private co2: Co2Service,
    private store: Store<AppState>,
    private alerta: MensajesalertasService,
    private modal: ModalController,
    private util: UtilesService,

  ) {


  }
  async ngOnInit() {
    this.store.dispatch(new CargarEstacionesAlllast());

    this.store.select('estacionesLastAll').subscribe(
      async (estaciones) => {
        this.loading && await this.alerta.presentLoading('... cargando');
        this.estaciones = estaciones.Estaciones;
        this.loading = estaciones.loading;
        this.loaded = estaciones.loaded;
        this.loaded && this.alerta.hideLoading();
      }
    )
    //this.store.dispatch(new fromEstacion.CargarEstacionEntradasName('aulatest 1', 1));
    this.iniciarGrafica();
  }
  iniciarGrafica() {
    const line = d3.line()
          .x(function(d, i) {
                return 0
            })
            .y(function(d) {
                return 0
            })
            .curve(d3.curveLinear);
  }






  async presentModal(id: any = -1) {
    const modal = await this.modal.create({
      component: DetallesPage,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': id,
      }
    });
    return await modal.present();
  }





}

