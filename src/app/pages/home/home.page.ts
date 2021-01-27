import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Co2Service } from 'src/app/services/co2.service';
import { MensajesalertasService } from 'src/app/services/mensajesalertas.service';
import { UtilesService } from 'src/app/services/utiles.service';
import { CargarEstacionesAllCurrentActive} from 'src/store/actions';
import { AppState } from 'src/store/app.reducer';
import * as fromEstacion from '../../../store/actions' 
import { DetallesPage } from '../detalles/detalles.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private estaciones = [];
  constructor(
    private co2: Co2Service,
    private store: Store<AppState>,
    private alerta: MensajesalertasService,
    private modal: ModalController,
    private util: UtilesService
  ) {

   
  }
  ngOnInit(): void {
    this.store.dispatch(new CargarEstacionesAllCurrentActive());
    this.store.select('estacionesActivas').subscribe(
      (estaciones) => {
       // console.log(estaciones.Estaciones);
        this.estaciones = estaciones.Estaciones;
      }
    )
     this.store.dispatch(new fromEstacion.CargarEstacionEntradasName('aulatest 1' ,1));
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

