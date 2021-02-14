import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UtilesService {

  constructor(private sanitaizer: DomSanitizer) { }

  jsonParse(dato: any) {
    if (dato && typeof (dato) != "undefined") {
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
        return "assets/img/co22.svg";
      case 'humid':
        return "assets/img/humedad.svg";
      case 'temp':
        return "assets/img/hot.svg";
      case 'press':
        return "assets/img/presion.svg";
      case 'noise':
        return "assets/img/ruido.svg";
      case 'date':
        return "assets/img/reloj.svg";
    }
  }

  devolverIconoEstado(valor: string): string{

    switch (valor) {
      case 'correcto':
        return "assets/img/correcto.svg";
      case 'incorrecto':
        return "assets/img/incorrecto3.svg";
    }


  }

  devolverIconoCo2(valor: number): string{
    if( 0 <= valor && valor <= 450 ){
      return "assets/img/optimo.svg";
    }else if(valor >450 && valor <= 810 ){
      return "assets/img/bien.svg";
    }else if (valor >810 && valor <= 1000 ){
      return "assets/img/regular.svg";
    }else if (valor >1000 && valor ){
      return "assets/img/mal.svg";
    }
  }




  fecha(fecha: string): string {
    const aux = moment(fecha).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    return moment(aux).add(1, 'hour').toISOString();
  }


  colorIcono(color) {
    return this.sanitaizer.bypassSecurityTrustStyle(`--variable: ${color}`);
  }


}
