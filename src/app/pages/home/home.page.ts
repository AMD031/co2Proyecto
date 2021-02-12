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
import { Platform } from '@ionic/angular';


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
  private ahora: Date = null;

  
  public anchoPantalla ;
  public tamMinPantalla = 639;
  public minFuente = '0.59em';
  public maxFuetne = '3em';
  public maxIcono = '2em';
  public minIcono = '1.5em';
  public maxIconoSuperior = '2em';
  public minIconoSuperior = '1em';




  constructor(
    private co2: Co2Service,
    private store: Store<AppState>,
    private alerta: MensajesalertasService,
    private modal: ModalController,
    private util: UtilesService,
    public platform: Platform
  ) {


  }


 

  async ngOnInit() {
    this.anchoPantalla =  this.platform.width();
    this.platform.resize.subscribe(async () => {
    this.anchoPantalla =  this.platform.width();
      //  console.log(this.anchoPantalla);
    });

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
            this.error = !estaciones.error.ok;
            this.error && this.ocultarRefresh();
            this.error && this.alerta.presentToast("No se ha podido cargar las Estaciones", "danger");
          }

          this.error && this.alerta.hideLoading();
          this.loaded && !this.loading && this.alerta.hideLoading();
          this.loaded && this.ocultarRefresh();

        }
      )
    } catch (error) {
      this.alerta.presentToast("No se ha podido cargar las Estaciones", "danger");
      this.alerta.hideLoading();
      this.ocultarRefresh()
    }

    this.actualizar();
    this.comprobarEstado("");
  }

  actualizar() {
    setInterval(()=>{
      this.store.dispatch(new CargarEstacionesAlllast());
    },600000)
  }



  comprobarEstado(estacion:any):void{

    
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
        cssClass: 'fullscreen',
        componentProps: {
          'id': id,
        }
      });
      return await modal.present();
    }
  }





}

