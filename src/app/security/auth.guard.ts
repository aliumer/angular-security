import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';
import { AppUserAuth } from './app-user-auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  securityObject: AppUserAuth;

  constructor(private securityService: SecurityService,
    private router: Router) {
    this.securityService.securitySubject.subscribe((data) => {
      this.securityObject = data;
    });
    this.securityService.getSecurityObject();
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.securityObject
          && this.securityObject.isAuthenticated
          && this.securityService.hasClaim(next.data.claimType)) {
        return true;
      } else {
        this.router.navigate(['login'], { queryParams: { returnUtl: state.url}});
      }
  }
}
