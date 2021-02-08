import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilesService {

  constructor() { }

  jsonParse(dato: any) {
    if (dato && dato !== 'undefined') {
      return JSON.parse(dato);
    }
  }


  capitalize(s): string {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }


  devolverIcono(valor: string): string {

    switch (valor) {
      case 'CO2':
        return "assets/img/co2.svg";
      case 'humid':
        return "assets/img/humedad.svg";
      case 'temp':
        return "assets/img/hot.svg";
      case 'press':
        return "assets/img/presion.svg";
      case 'noise':
        return "assets/img/ruido.svg";
    }
  }



}
