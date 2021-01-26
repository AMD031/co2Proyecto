import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {  Subscription } from 'rxjs';
import { CargarEstacion } from 'src/store/actions';
import { AppState } from 'src/store/app.reducer';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.page.html',
  styleUrls: ['./detalles.page.scss'],
})
export class DetallesPage implements OnInit {
  
  @Input('id')id;
  constructor(
    private store: Store<AppState>, 
    private modal: ModalController) { }
    private estacion: any;
    private ob$: Subscription

  ngOnInit() {
    if(this.id !== -1){
       this.store.dispatch( new CargarEstacion(this.id));
        this.ob$ = this.store.select('estacion').subscribe(
         (estacion) =>{
           this.estacion = estacion.Estacion;
         });
    }

  }

  ionViewDidLeave() {
    this.ob$.unsubscribe();
  }
  

}
