import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from
  "@angular/router";
import { Observable } from "rxjs";
import { UsuarioService } from '../usuarios/usuario.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree |
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAutenticado = this.usuarioService.isAutenticado();
    if (!isAutenticado) {
      this.router.navigate(['/login']);
    }
    return isAutenticado;
  }
}
