import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilesService {

  constructor() { }

  jsonParse(dato: any) {
    if(dato && dato !== 'undefined'){
      return JSON.parse(dato);
    }
  }


   capitalize(s): string  {
    if (typeof s !== 'string') return '' 
    return s.charAt(0).toUpperCase() + s.slice(1)
  }


}
