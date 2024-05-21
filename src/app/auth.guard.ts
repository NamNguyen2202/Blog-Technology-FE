import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not available');
      return false;
    }

    const user = localStorage.getItem('user');
    if (user) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
