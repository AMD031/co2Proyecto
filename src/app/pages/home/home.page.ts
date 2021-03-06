import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Co2Service } from 'src/app/services/co2.service';
import { MensajesalertasService } from 'src/app/services/mensajesalertas.service';
import { UtilesService } from 'src/app/services/utiles.service';
import { CargarEstacionesAllActive, CargarEstacionesAlllast } from 'src/store/actions';
import { AppState } from 'src/store/app.reducer';
import * as fromEstacion from '../../../store/actions'
import { DetallesPage } from '../detalles/detalles.page';
import * as d3 from "d3";
import *as moment from 'moment';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { take } from 'rxjs/operators';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  @ViewChild(IonContent) theContent: IonContent;
  
  public estaciones = [];
  private loading: boolean = true;
  private loaded: boolean;
  private error: any;
  private mostrarLoading: boolean = true;
  private evento: any = null;
  private comprobacion: number = 1;
  private llamado = false;

  public anchoPantalla;
  public tamMinPantalla = 639;
  public minFuente = '0.48em';
  public maxFuente = '0.86em';
  public maxIcono = '2em';
  public minIcono = '1.5em';
  public maxIconoSuperior = '2em';
  public minIconoSuperior = '1em';
  private diferencia = 60000;
  private activas: any[];
  diff: number;
  private ids: any[];
  //num: number = 0;
  constructor(
    private co2: Co2Service,
    private store: Store<AppState>,
    private alerta: MensajesalertasService,
    private modal: ModalController,
    public util: UtilesService,
    public platform: Platform,
    private router: Router

  ) {
  }

  
  async cargaInicialLastAll() {
    try {
      this.store.select('estacionesLastAll').subscribe(
        async (estaciones) => {
          if (estaciones.Estaciones) {
            this.estaciones = estaciones.Estaciones
          }

          if (estaciones.loaded && !this.llamado) {
            this.comprobarEstado();
            this.llamado = true;
          
          }
         
          !estaciones.loading && this.alerta.hideLoading();
          !estaciones.loading && this.ocultarRefresh();
          estaciones.error && this.alerta.hideLoading();
          estaciones.error && this.ocultarRefresh();
          estaciones.error && this.alerta.presentToast("No se ha podido cargar las Estaciones", "danger");
          (typeof estaciones.loading !== 'undefined') && this.alerta.hideLoading();
        }
      )


    } catch (error) {
      this.alerta.hideLoading();
      this.ocultarRefresh()
      this.alerta.presentToast("No se ha podido cargar las Estaciones, comprueba la conexión", "danger");
    }
  }


  async cargarInicialCurrentActive() {
    try {
      if (this.mostrarLoading /*&& this.loading */) {
        await this.alerta.presentLoading('Cargando ...');
      }
      this.store.dispatch(new CargarEstacionesAllActive());
      this.store.select('estacionesAllActive').subscribe(
        async (activas) => {
          if (activas.Estaciones) {

            this.activas = activas.Estaciones;
            this.ids = this.activas.map(
              (dato) => {
                return { id: dato.station }
              });
          }

          activas.loaded && this.store.dispatch(new CargarEstacionesAlllast());
          activas.error && this.alerta.hideLoading();
          activas.error && this.ocultarRefresh();
          activas.error && this.alerta.presentToast("No se ha podido cargar las Estaciones, comprueba la conexión", "danger");
          (typeof activas.loading !== 'undefined') && this.alerta.hideLoading();
        });

    } catch (error) {
      this.alerta.hideLoading();
      this.alerta.presentToast("No se ha podido cargar las Estaciones, comprueba la conexión", "danger");
    }

  }


  async ngOnInit() {
  
    this.anchoPantalla = this.platform.width();
    this.platform.resize.subscribe(async (e) => {
      this.anchoPantalla = this.platform.width();
      //  console.log(this.anchoPantalla);
    });
    this.cargarInicialCurrentActive();
    this.cargaInicialLastAll();
  }





  comprobarEstado() {
    let lectura = null;
    let lecturas: Array<string> = [];

    if (this.estaciones) {
      this.estaciones.forEach(elemento => {
        lecturas.push(elemento.time);
      });
    }

    lecturas = this.ordenarFechas(lecturas);
    if (lecturas.length > 0) {
      lectura = lecturas[0];
    }

    if (lectura) {
      const momentoActual = this.util.fecha(moment().toISOString())
      const lecturaFutura = this.util.fecha(moment(lectura).add(this.comprobacion, 'minutes').toISOString())
      const date1 = moment(momentoActual);
      const date2 = moment(lecturaFutura);
      this.diff = date2.diff(date1);
      (this.diff) > 0 ? this.diferencia = (this.diff) : this.diferencia = 60000;
    }

    setTimeout(async () => {
      // this.store.dispatch(new CargarEstacionesAlllast());
      this.mostrarLoading && await this.alerta.presentLoading('Cargando ...');
      this.store.dispatch(new CargarEstacionesAllActive());
      this.comprobarEstado();
    }, this.diferencia );
  }

  ordenarFechas(arr: Array<any>): Array<any> {
    if (arr.length <= 0) {
      return [];
    }
    return arr.sort((a: any, b: any) => {
      a = this.util.fecha(moment(a).toISOString());
      b = this.util.fecha(moment(b).toISOString());
      if (moment(a).isAfter(b, "milliseconds")) {
        return -1;
      }
      if (moment(a).isBefore(b, "milliseconds")) {
        return 1;
      }
      return 0;
    });
  }

  buscarId(arr: Array<any>, valor: any): boolean {

    let encontrado = arr.find(obj => obj.id == valor);
    if (typeof encontrado !== 'undefined' && encontrado) {
      return true;
    } else {
      return false;
    }
  }



  comprobarId(id: any) {
    if (!this.ids || this.ids.length < 0) {
      return this.util.devolverIconoEstado("desconocido");
    }
    const resultado = this.buscarId(this.ids, id);
    if (resultado) {
      return this.util.devolverIconoEstado("correcto");
    } else {
      return this.util.devolverIconoEstado("incorrecto");
    }


  }


  ocultarRefresh() {
    if (this.evento) {
      this.evento.target.complete();
      this.mostrarLoading = true;
    }
  }

  async doRefresh($event) {
    this.mostrarLoading = false;
    if ($event) {
      this.evento = $event;
      //await this.store.dispatch(new CargarEstacionesAlllast());
      this.store.dispatch(new CargarEstacionesAllActive());
    }
  }

  async presentModal(id: any = -1) {
    this.mostrarLoading = false;

    
    const modal = await this.modal.create({
      component: DetallesPage,
      cssClass: 'fullscreen',
      componentProps: {
        'id': id,
      }
    });

    modal.onDidDismiss()
      .then(async (data) => {
        this.mostrarLoading = true;
        const mensaje = data['data']
        if (mensaje === 'borrado') {
          //this.store.dispatch(new CargarEstacionesAlllast());
          this.store.dispatch(new CargarEstacionesAllActive());
        }
      });
    
    return await modal.present();

  }







}

