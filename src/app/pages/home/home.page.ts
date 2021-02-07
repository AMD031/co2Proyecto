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
import *as moment from 'moment';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public estaciones = [];
  private loading: boolean;
  private loaded: boolean;
  private error: any;
  private mostrar: boolean = true;
  private evento: any = null;

  constructor(
    private co2: Co2Service,
    private store: Store<AppState>,
    private alerta: MensajesalertasService,
    private modal: ModalController,
    private util: UtilesService,
  ) {


  }




  async ngOnInit() {

    if (this.mostrar) {
      await this.alerta.presentLoading('Cargando ...');
    }

    try {
      this.store.dispatch(new CargarEstacionesAlllast());
      this.store.select('estacionesLastAll').subscribe(
        async (estaciones) => {
          this.loading = estaciones.loading;
          this.estaciones = estaciones.Estaciones;
          this.loaded = estaciones.loaded;
          if (estaciones.error) {
            this.error = estaciones.error.ok;
          }
          !this.error && this.alerta.hideLoading();
          this.loaded && !this.loading && this.alerta.hideLoading();
          this.loaded && this.ocultarRefresh();
          this.error && this.ocultarRefresh();
        }
      )
    } catch (error) {
      this.alerta.hideLoading();
      this.ocultarRefresh()
    }

    //this.actualizar();
  }

  actualizar() {

    setInterval(() => {

      console.log("tiempo: ", this.estaciones[0].time);


    }, 3000);
  }

  ocultarRefresh() {
    if (this.evento) {
      !this.loading && this.evento.target.complete();
    }
  }

  async doRefresh($event) {
    this.mostrar = false;
    if ($event) {
      this.evento = $event;
      await this.store.dispatch(new CargarEstacionesAlllast());
    }
  }

  async presentModal(id: any = -1) {

    if (id !== -1) {
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





}

