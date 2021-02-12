import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MensajesalertasService } from 'src/app/services/mensajesalertas.service';
import { UtilesService } from 'src/app/services/utiles.service';
import { BorrarEntradasEstacion, BorrarEntradasEstacionSuccess, CargarEstacionesAlllast, CargarEstacionId, logOut } from 'src/store/actions';
import { AppState } from 'src/store/app.reducer';
import { GraficaPage } from '../grafica/grafica.page';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  @Input('id') id;
  public entrada: any;
  public entradasEstacion: any = [];
  private ob$: Subscription;
  private ob2$: Subscription;
  public ampliar: boolean = true;
  public finCarga: boolean;
  public co2: Number = 0;
  public temp: Number = 0;
  public humid: Number = 0;
  public press: Number = 0;
  public noise: Number = 0;
  public nombreEstacion: string;
  private evento: any;

  //tamaños
  public anchoPantalla: any;
  public tamMinPantalla = 639;
  public minFuente = '0.8em';
  public maxFuetne = '3em';
  public maxIcono = '2.5em';
  public minIcono = '1.5em';
  public maxIconoSuperior = '2em';
  public minIconoSuperior = '1em';
  private loaded;
  private loading;
  private errorBorrar;
  message: string;
  private respBorrar;


  constructor(
    private store: Store<AppState>,
    private _modal: ModalController,
    private util: UtilesService,
    private mensaje: MensajesalertasService,
    public platform: Platform,
    private router: Router,
  ) { }

  ngOnInit() {

    this.anchoPantalla = this.platform.width();

    this.platform.resize.subscribe(async () => {
      this.anchoPantalla = this.platform.width();
      // console.log(this.anchoPantalla);
    });

    if (this.id !== -1) {
      try {
        this.store.dispatch(new CargarEstacionId(this.id));
        this.ob$ = this.store.select('estacion').subscribe(
          (estacion) => {
            if (estacion.Estacion && Object.keys(estacion.Estacion).length !== 0) {
              this.entrada = estacion.Estacion[0];
              this.co2 = this.entrada.data.CO2
              this.temp = this.entrada.data.temp
              this.humid = this.entrada.data.humid
              this.press = this.entrada.data.press
              this.noise = this.entrada.data.noise
              this.nombreEstacion = this.entrada.station;
              this.finCarga = !estacion.loading;
              this.finCarga && this.ocultarRefresh();
            }
          });
      } catch (error) {
        this.mensaje.presentToast("Fallo al cagar datos de la estación", "danger")
      }
    }
  }

  ampliarRecibido($event) {
    this.message = $event;
    if (this.message === "amplia") {
      this.ampliarGrafica();
    }
  }

  async ampliarGrafica() {
    this.ampliar = !this.ampliar;
    // console.log("mando "+this.nombreEstacion);
    const modal = await this._modal.create({
      component: GraficaPage,
      cssClass: 'fullscreen',
      componentProps: {
        'nombre': this.nombreEstacion,
      }
    });
    modal.onDidDismiss()
      .then(() => {
        this.ampliar = !this.ampliar;
      });
    return await modal.present();
  }

  ocultarRefresh() {
    if (this.evento) {
      this.evento.target.complete();
    }
  }

  async doRefresh($event) {
    if ($event && this.id !== -1) {
      this.evento = $event;
      await this.store.dispatch(new CargarEstacionId(this.id));
    }
  }


  async borrarEntrada() {
    //this.store.dispatch(new BorrarEntradasEstacionSuccess(""));
    if (this.nombreEstacion) {
     this.respBorrar = await this.mensaje.presentAlertConfirm("Borrar", "¿Estás seguro que quieres borrar?", "Cancelar", "Aceptar");


      if (this.respBorrar) {
        this.mensaje.presentLoading("Intentando borrar...");
        this.store.dispatch(new BorrarEntradasEstacion(this.nombreEstacion));
      }

      this.ob2$ = this.store.select('EntradasPaginadas').subscribe(
        (estacion) => {

          this.loading = estacion.loading;
          this.loaded = estacion.loaded;

          if (estacion.error) {
            this.errorBorrar = !estacion.error.ok;
            this.errorBorrar && this.ocultarRefresh();
            this.errorBorrar && this.mensaje.presentToast("No se ha podido borrar las entradas", "danger");
          }

          console.log(this.errorBorrar);
          !this.errorBorrar && this.mensaje.hideLoading();
          !this.errorBorrar && this.store.dispatch(new CargarEstacionesAlllast());
          !this.loading && this.mensaje.hideLoading();
          !this.loading && this.respBorrar && this.mensaje.cerrarModal();

        });
    }
  }


  ionViewDidLeave() {
    this.co2 = 0;
    this.temp = 0;
    this.humid = 0;
    this.press = 0;
    this.noise = 0;
    this.ob$ && this.ob$.unsubscribe();
    this.ob2$ && this.ob2$.unsubscribe();
  }


}
