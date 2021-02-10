import { Injectable } from '@angular/core';
import * as moment from 'moment';

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

  fecha(fecha: string):string{
    const aux =  moment(fecha).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    return moment(aux).add(1, 'hour').toISOString();
  }


}
