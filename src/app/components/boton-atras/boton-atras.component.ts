import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-boton-atras',
  templateUrl: './boton-atras.component.html',
  styleUrls: ['./boton-atras.component.scss'],
})
export class BotonAtrasComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {}

  onClick():void{
    this.modalController.dismiss();
  }

}
