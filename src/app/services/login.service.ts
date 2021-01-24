import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService implements CanActivate {
  private permiso = false;
  constructor(  private router: Router,) { }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    if (!this.permiso) {
      this.router.navigate(['login']);
      return false;
    }
     return true;
  }

  public isLogged(dato :any = { usuario : '',  password : ''}): boolean {
    if (dato.usuario === 'usuario' && dato.password === 'usuario'){
      this.permiso = true;
      return this.permiso;
    } else {
      this.permiso = false;
      return this.permiso;
    }
  }

}
