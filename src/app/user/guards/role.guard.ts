import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../login/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authSevice: AuthService, private router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authSevice.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
      }

    const role = next.data.role as string;
    if (this.authSevice.hasRole(role)) {
      return true;
    }
    swal.fire('Acceso denegado', 'No tienes los permisos necesarios', 'warning');
    this.router.navigate(['home/page/0']);
    return false;
  }

}
