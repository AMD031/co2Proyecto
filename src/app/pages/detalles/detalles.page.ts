import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { MensajesalertasService } from 'src/app/services/mensajesalertas.service';
import { UtilesService } from 'src/app/services/utiles.service';
import { BorrarEntradasEstacion, BorrarEntradasEstacionSuccess, CargarEstacionesAlllast, CargarEstacionId, logOut, ReiniciarEstacion } from 'src/store/actions';
import { AppState } from 'src/store/app.reducer';
import { GraficaPage } from '../grafica/grafica.page';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { GraficaconfService } from 'src/app/services/graficaconf.service';

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
  public maxFuente = '1em';
  public maxIcono = '2.5em';
  public minIcono = '1.5em';
  public maxIconoSuperior = '2em';
  public minIconoSuperior = '1em';
  //------------------

  private loaded;
  private loadedBorrar;
  private loading = true;
  private errorBorrar;
  message: string;
  private respBorrar;
  private mostrar: boolean = true;
  private error: any;
  private llamado = false;
  private loadingBorrar: any
  constructor(
    private store: Store<AppState>,
    private _modal: ModalController,
    public util: UtilesService,
    private mensaje: MensajesalertasService,
    public platform: Platform,
    private router: Router,
    private configGrafica: GraficaconfService,


  ) { }

  async ngOnInit() {

    this.anchoPantalla = this.platform.width();

    this.platform.resize.subscribe(async () => {
      this.anchoPantalla = this.platform.width();
      // console.log(this.anchoPantalla);
    });


    if (this.id !== -1) {
      try {

        if (this.mostrar /*&& this.loading*/) {
          await this.mensaje.presentLoading('Cargando ...');
        }

        this.store.dispatch(new CargarEstacionId(this.id));
        this.ob$ = this.store.select('estacion').subscribe(
          async (estacion) => {

            if (estacion.Estacion && Object.keys(estacion.Estacion).length !== 0) {
              this.entrada = estacion.Estacion[0];
              this.co2 = this.entrada.data.CO2
              this.temp = this.entrada.data.temp
              this.humid = this.entrada.data.humid
              this.press = this.entrada.data.press
              this.noise = this.entrada.data.noise
              this.nombreEstacion = this.entrada.station;
              this.finCarga = !estacion.loading;

            }
            estacion.error && this.mensaje.hideLoading();
            estacion.error && this.ocultarRefresh();
            estacion.error && this.mensaje.presentToast("No se ha podido cargar los datos de la estación", "danger");
            !estacion.loading && estacion.loaded && this.ocultarRefresh();
            !estacion.loading && estacion.loaded && this.mensaje.hideLoading();
            (typeof estacion.loading !== 'undefined') && this.mensaje.hideLoading();
            (typeof estacion.loading !== 'undefined') && this.ocultarRefresh();
          });

      } catch (error) {
        this.mensaje.hideLoading();
        this.mensaje.presentToast("No se ha podido cargar los datos de la estación", "danger")
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
    this.mostrar = false;
    if ($event && this.id !== -1) {
      this.evento = $event;
      await this.store.dispatch(new CargarEstacionId(this.id));
    }
  }


  async borrarEntrada() {
    //this.store.dispatch(new BorrarEntradasEstacionSuccess(""));

    try {



      if (this.nombreEstacion) {
        this.respBorrar = await this.mensaje.presentAlertConfirm("Borrar", "¿Estás seguro que quieres borrar?", "Cancelar", "Aceptar");


        if (this.respBorrar) {
          await this.mensaje.presentLoading("Intentando borrar...");
          this.store.dispatch(new BorrarEntradasEstacion(this.nombreEstacion));


          this.ob2$ = this.store.select('EntradasPaginadas').subscribe(
            (estacion) => {

              this.loadingBorrar = estacion.loading;
              this.loadedBorrar = estacion.loaded;

              if (estacion.error && this.respBorrar) {
                this.errorBorrar = !estacion.error.ok;
                this.errorBorrar && this.mensaje.hideLoading();
                this.errorBorrar && this.ocultarRefresh();
                this.errorBorrar && this.mensaje.presentToast("No se ha podido borrar las entradas", "danger");
              }
            });

          this.errorBorrar && this.mensaje.hideLoading();
          !this.loadingBorrar && this.mensaje.hideLoading();
          !this.loadingBorrar && this.respBorrar && !this.errorBorrar && this.mensaje.cerrarModal("borrado");
          (typeof this.loading !== 'undefined') && this.mensaje.hideLoading();
        }
      } else {
        this.mensaje.presentToast("No se puede borrar una estación que no ha sido cargada", "danger");
      }



    } catch (error) {
      this.mensaje.hideLoading();
      this.mensaje.presentToast("No se ha podido borrar las entradas", "danger");
    }

  }


  ionViewWillLeave() {
    this.store.dispatch(new ReiniciarEstacion());
  }


  ionViewDidLeave() {
    this.ob$ && this.ob$.unsubscribe();
    this.ob2$ && this.ob2$.unsubscribe();
    this.configGrafica.page = 1;

  }


}
