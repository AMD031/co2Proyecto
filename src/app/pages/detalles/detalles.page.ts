import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UtilesService } from 'src/app/services/utiles.service';
import { CargarEstacionEntradasName, CargarEstacionesAlllast, CargarEstacionId } from 'src/store/actions';
import { AppState } from 'src/store/app.reducer';
import { GraficaPage } from '../grafica/grafica.page';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {

  @Input('id') id;
  private entrada: any;
  private entradasEstacion: any = [];
  private ob$: Subscription;
  private ob2$: Subscription;
  private ampliar: boolean = false;

  private co2: Number = 0;
  private temp: Number = 0;
  private humid: Number = 0;
  private press: Number = 0;
  private noise: Number = 0;
  private nombreEstacion: string = '';

  constructor(
    private store: Store<AppState>,
    private _modal: ModalController,
    private util: UtilesService,
  ) { }


  ngOnInit() {
    if (this.id !== -1) {
      try {
        this.store.dispatch(new CargarEstacionId(this.id));
        this.ob$ = this.store.select('estacion').subscribe(
          (estacion) => {
            //this.estacion = estacion.Estacion;
            if (estacion.Estacion) {
              this.entrada = estacion.Estacion[0];
              this.co2 = this.entrada.data.CO2
              this.temp = this.entrada.data.temp
              this.humid = this.entrada.data.humid
              this.press = this.entrada.data.press
              this.noise = this.entrada.data.noise
              this.nombreEstacion = this.entrada.station;
              this.store.dispatch(new CargarEstacionEntradasName(this.nombreEstacion, 1));
            }
          });

        this.ob2$ = this.store.select('EntradasPaginadas').subscribe(
          (datos) => {
            this.entradasEstacion = datos.Entradas;
            //console.log(this.entradasEstacion);
            
          });
      } catch (error) {
        console.log(error);

      }
    }
  }

  async ampliarGrafica(){

    this.ampliar = !this.ampliar;
    // console.log("mando "+this.nombreEstacion);
    // const modal = await this._modal.create({
    //   component: GraficaPage,
    //   cssClass: 'my-custom-class',
    //   componentProps: {
    //     'nombre': this.nombreEstacion,
    //   }
    // });
    // return await modal.present();
  }


  
  
  ionViewDidLeave() {
    this.co2 = 0;
    this.temp = 0;
    this.humid = 0;
    this.press = 0;
    this.noise = 0;
    this.ob$.unsubscribe();
    this.ob2$.unsubscribe();

  }


}
