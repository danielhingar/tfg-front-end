import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authSevice: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authSevice.isAuthenticated()) {
        if (this.isTokenExpirado()) {
          this.authSevice.logout();
          this.router.navigate(['']);
          return false;
        }
        return true;
      }
      this.router.navigate(['']);
      return false;
  }

  isTokenExpirado() {
    const token = this.authSevice.token;
    const payload = this.authSevice.obtenerDatosToken(token);
    const now = new Date().getTime() / 1000;
    if ( payload.exp < now) {
      return true;
    }
    return false;
  }

}
