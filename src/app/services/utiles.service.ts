import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilesService {

  constructor() { }

  jsonParse(dato: any) {

    console.log(dato);
    
    if(dato && dato !== 'undefined'){
      return JSON.parse(dato);
    }
  }

}
