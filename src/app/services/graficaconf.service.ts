import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GraficaconfService {

  constructor() { }


  page: number = 1;
  amuentar: boolean = false;
  tamagnoPunto: any = 3;
  tamagnoFuente: number = 15;
  mostrarTexto: boolean = true;
  mostrarLeyenda: boolean = true;

  public allGroup: any = ["CO2" /*, "temp", "humid", "press", "noise"*/];

  // public colores =          ["#66c2a5","#fc8d62", "#8da0cb", "#e78ac3", "#a6d854"];
  
  public marcdos: any = [];
  public elementos: any = [
    {
      name: 'checkbox0',
      type: 'checkbox',
      label: 'CO2',
      value: 'CO2',
      checked: true,
    },
    {
      name: 'checkbox1',
      type: 'checkbox',
      label: 'Temperatura',
      value: 'temp',
      checked: false
    },
    {
      name: 'checkbox2',
      type: 'checkbox',
      label: 'Humedad',
      value: 'humid',
      checked: false
    },
    {
      name: 'checkbox3',
      type: 'checkbox',
      label: 'Presión',
      value: 'press',
      checked: false
    },
    {
      name: 'checkbox4',
      type: 'checkbox',
      label: 'Ruido',
      value: 'noise',
      checked: false
    },
    {
      name: 'checkbox5',
      type: 'checkbox',
      label: 'Texto',
      value: 'texto',
      checked: true
    },
    {
      name: 'checkbox6',
      type: 'checkbox',
      label: 'Leyenda',
      value: 'leyenda',
      checked: true
    },

  ]

  
}
