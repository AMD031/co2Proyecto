import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {  Subscription } from 'rxjs';
import { UtilesService } from 'src/app/services/utiles.service';
import { CargarEstacionId } from 'src/store/actions';
import { AppState } from 'src/store/app.reducer';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  
  @Input('id') id;
  private estacion: any;
  private ob$: Subscription
  constructor(
    private store: Store<AppState>, 
    private modal: ModalController,
    private util: UtilesService
    ) { }
  

  ngOnInit() {
    if(this.id !== -1){
       this.store.dispatch( new CargarEstacionId(this.id));
        this.ob$ = this.store.select('estacion').subscribe(
         (estacion) =>{
           this.estacion = estacion.Estacion;
         });
    }

    // this.store.dispatch( new CargarEstacionName('aulatest 1'));


  }

  ionViewDidLeave() {
    this.ob$.unsubscribe();
  }
  

}
