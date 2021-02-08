import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { UtilesService } from 'src/app/services/utiles.service';
import { CargarEstacionId } from 'src/store/actions';
import { AppState } from 'src/store/app.reducer';
import { GraficaPage } from '../grafica/grafica.page';


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
  public ampliar: boolean = true;
  public finCarga:boolean ;
  public co2: Number = 0;
  public temp: Number = 0;
  public humid: Number = 0;
  public press: Number = 0;
  public noise: Number = 0;
  public nombreEstacion: string;
  private evento: any;

  message:string;


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
            if (estacion.Estacion) {
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
        console.log(error);
      }
    }
  }

  ampliarRecibido($event) {
    this.message = $event;
    if(this.message === "amplia"){
      this.ampliarGrafica();
    }
    
  }

  async ampliarGrafica(){
    this.ampliar = !this.ampliar;
    // console.log("mando "+this.nombreEstacion);
    const modal = await this._modal.create({
      component: GraficaPage,
      cssClass: 'my-custom-class',
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

  ocultarRefresh(){
    if (this.evento) {
      this.evento.target.complete();
    }
  }

  async doRefresh($event){
    if($event && this.id !== -1){
      this.evento = $event;
      await this.store.dispatch(new CargarEstacionId(this.id));
    }
}

    
  borrarEntrada(){
    this._modal.dismiss();
  }


  ionViewDidLeave() {
    this.co2 = 0;
    this.temp = 0;
    this.humid = 0;
    this.press = 0;
    this.noise = 0;
    this.ob$.unsubscribe();
  }


}
