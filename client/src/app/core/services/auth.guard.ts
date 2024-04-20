import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredAuth = route.data['requiredAuth'];

    if (this.authService.userIsAuth()) {
      if (!requiredAuth) {
        this.router.navigate(['/']);
      }
      return true;
    } else {
      if (requiredAuth) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }
  }
}
