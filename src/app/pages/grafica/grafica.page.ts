import { Component, OnInit, Input } from '@angular/core';
import { AppState } from 'src/store/app.reducer';
import { Store } from '@ngrx/store';
import { CargarEstacionEntradasName } from 'src/store/actions';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.page.html',
  styleUrls: ['./grafica.page.scss'],
})

export class GraficaPage implements OnInit {
  @Input('nombre') nombre: string = '';
  constructor(private store: Store<AppState>,) { }
  private ob$: Subscription;
  public entradasEstacion: any = [];
  ngOnInit() {
    console.log("nombre: "+this.nombre);
    
    if (this.nombre !== '') {
      this.ob$ = this.store.select('EntradasPaginadas').subscribe(
        (datos) => {
          this.entradasEstacion = datos.Entradas;
          console.log(this.entradasEstacion);
        });
    }

  }

}
