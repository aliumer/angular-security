import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from './app-user';
import { AppUserAuth } from './app-user-auth';
import { SecurityService } from './security.service';

@Component({
  selector: 'ptc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  returnUrl: string;
  constructor(private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router) { }

  login() {
    this.securityService.securitySubject
      .subscribe((data) => {
        this.securityObject = data;
        if (this.securityObject.isAuthenticated) {
          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          }
        }
      }, () => {
        this.securityObject = new AppUserAuth();
      });
    this.securityService.login(this.user);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUtl'];
  }

}
