import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { AppUserAuth } from './app-user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  securityObject: AppUserAuth;

  constructor(private securityService: SecurityService) {
    this.securityService.securitySubject.subscribe((data) => {
      console.log('gotcha:', data);
      this.securityObject = data;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.securityObject) {
      const result = this.securityObject.isAuthenticated && this.securityObject[next.data.claimType];
      return result;
    } else {
      console.log('no security object');
      return false;
    }
  }
}
