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
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
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

  devolverIconoEstado(valor: string): any{

    switch (valor) {
      case 'correcto':
        return { url: "assets/img/correcto.svg" , color: "#008800"}
      case 'incorrecto':
        return {url: "assets/img/incorrecto3.svg", color: "#550000"};

       case 'desconocido':
         return   {url: "assets/img/desco.svg", color: "grey"};
    }


  }

  devolverIconoCo2(valor: number): any{
    if( 0 <= valor && valor <= 450 ){
      return { url: "assets/img/optimo.svg" , color: "#00AA00"}
    }else if(valor >450 && valor <= 810 ){
      return { url: "assets/img/bien.svg" , color: "#008800"}
    }else if (valor >810 && valor <= 1000 ){
      return { url: "assets/img/regular.svg" , color: "#f0540e"}
    }else if (valor >1000){
      return { url: "assets/img/mal.svg" , color: "#550000"}
    }


  }




  fecha(fecha: string): string {
    const aux = moment(fecha).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    return moment(aux).add(1, 'hour').toISOString();
  }


  colorIcono(color) {
    return this.sanitaizer.bypassSecurityTrustStyle(`--variable: ${color}`);
  }

  formatoFecha(fecha?: string, formato:string ='HH:mm'): string{
    return moment( fecha).format(formato)
  }


  agregarElementoArr(pos, arr:any, elemento:string):Array<string> {
   return arr.splice(pos, 0, elemento);
  }

  eliminarElementoArr(arr:any, id:number): Array<string> {
    return arr.filter( (valor ,idx) =>{  return idx !== id } )
  }

  indiceElementoArr(ele: string, arr:any){
      const autIndex = (element:any) => element ===  ele;
      console.log(arr.findIndex(autIndex));
  }


}
