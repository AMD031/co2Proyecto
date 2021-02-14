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



  
}
