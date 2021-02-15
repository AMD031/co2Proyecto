import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import * as loginActions from 'src/store/actions';
import { AppState } from 'src/store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {
   private permiso;
  constructor(   private router: Router, private store: Store<AppState>) { }

  init(){
    this.store.select('login')
    .subscribe( login => {
        this.permiso = login.login;
      this.permiso = true;
    });
  }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    if (!this.permiso) {
      this.router.navigate(['login']);
      return false;

    }
     return true;
  }

  public iniciarLogin(dato :any = { usuario : '',  password : ''}) /*: boolean */{
    if (dato.usuario === 'usuario' && dato.password === 'usuario'){
      this.store.dispatch( new loginActions.login());
    } else {
      this.store.dispatch( new loginActions.logOut());
      }
  }


  estaLogeado(){
    return this.permiso;
  }
  
}
