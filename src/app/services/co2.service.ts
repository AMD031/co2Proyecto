import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Co2Service {

  constructor(private http: HttpClient
  ) { }

  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'apiKey': 'Franciscodelosrios.es'
    };
  }

  /**
   * @description Francisco de los Ríos - Solicita toda la información de la
   * base de datos. No se recomienda su uso. IMPORTANTE: en
   * header es necesario incluir apikey.
   */
  getStations(): Observable<any> {
    const endPoint = environment.endPoint + '/stations';
    return this.http.get(endPoint, { headers: this.header });
  }


  /**
   * @description Francisco de los Ríos - Solicita toda la información de la
   *  base de datos paginada por 10 elementos. No se
   *  recomienda su uso. IMPORTANTE: en header es necesario
   *  incluir apikey.
   */
  getStationsPage(page: any): Observable<any> {
    const endPoint = environment.endPoint + `/stations/page/${page}`;
    return this.http.get(endPoint, { headers: this.header });
  }

  /**
   *  @description Francisco de los Ríos - Solicita toda la información asociada
   *  a una entrada concreta idendificada por id. IMPORTANTE:
   *  en header es necesario incluir apikey.
   */
  getStationsId(id: any) {
    const endPoint = environment.endPoint + `/stations/${id}`;
    return this.http.get(endPoint, { headers: this.header });
  }


  /**
   *   @description Francisco de los Ríos - Solicita todas las entradas de una
   *   estación idenficada por su nombre. IMPORTANTE: en header
   *   es necesario incluir apikey.
   * 
   */
  getStationsName(name: any) {
    const endPoint = environment.endPoint + `/stations/name/${name}`;
    return this.http.get(endPoint, { headers: this.header });
  }


  /**
   *  @description Francisco de los Ríos - Solicita todas las entradas de una
   *  estación idenficada por su nombre paginadas por 10
   *  entradas por página. IMPORTANTE: en header es necesario
   *  incluir apikey.
   */
  getStationsNamePage(name: any, page: any) {
    const endPoint = environment.endPoint + `/stations/name/${name}/page/${page}`;
    return this.http.get(endPoint, { headers: this.header });
  }

  /**
   *  @description Francisco de los Ríos - Solicita la última lectura de todas las
   *   estaciones realizada dentro de los 10 últimos minutos. Se
   *   supone que las estaciones que no han enviado información
   *   en 10 minutos no están activas. IMPORTANTE: en header es
   *   necesario incluir apikey.  
   */

  getAllCurrentActive() {
    const endPoint = environment.endPoint + `/all/currentActive`;
    return this.http.get(endPoint, { headers: this.header });
  }

  /**
   *  @description Francisco de los Ríos - Solicita la última lectura de todas las
   *  estaciones. Activas o no. IMPORTANTE: en header es
   *  necesario incluir apikey.
   */

  getAllLast(): Observable<any> {
    const endPoint = environment.endPoint + '/all/last';
    return this.http.get(endPoint, { headers: this.header });
  }

  /**
   *  @description Francisco de los Ríos - Inserta una nueva entrada.
   *  IMPORTANTE: en header es necesario incluir apikey.
   */

  postStations(name: any, data: any): Observable<any> {
    const endPoint = environment.endPoint + `/stations/${name}`;
    return this.http.post(endPoint, { data }, { headers: this.header });
  }


  /**
   * 
   * @description Francisco de los Ríos - Inserta una nueva entrada.
   * IMPORTANTE: en header es necesario incluir apikey.
   */
  putStations(id: any, data: any): Observable<any> {
    const endPoint = environment.endPoint + `/stations/${id}`;
    return this.http.put(endPoint, { data }, { headers: this.header });
  }


  /**
   *  Francisco de los Ríos - Elmina una entrada idenficada por su
   *  id. IMPORTANTE: en header es necesario incluir apikey.
   */
  // 
  deleteStationsId(id: any): Observable<any> {
    const endPoint = environment.endPoint + `/stations/${id}`;
    return this.http.delete(endPoint, { headers: this.header });
  }





  /***
   *  Francisco de los Ríos - Elmina todas las entradas de una
   *   estación idenficada por su nombre. IMPORTANTE: en header
   *   es necesario incluir apikey.
   */
  deleteStationsName(name: any): Observable<any> {
    const endPoint = environment.endPoint + `/stations/${name}`;
    return this.http.delete(endPoint, { headers: this.header });
  }




}
