import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilesService {

  constructor() { }

  jsonParse(dato: any) {
    return JSON.parse(dato);
  }

}
