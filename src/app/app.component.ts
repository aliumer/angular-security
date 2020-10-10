import { Component, OnInit } from '@angular/core';
import { SecurityService } from './security/security.service';
import { AppUserAuth } from './security/app-user-auth';

@Component({
  selector: 'ptc-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'Paul\'s Training Company';
  securityObject: AppUserAuth = null;

  constructor(private securityService: SecurityService) {
  }

  ngOnInit() {
    this.securityService.securitySubject.subscribe((data) => {
      this.securityObject = data;
    });
  }

  logout() {
    this.securityService.logout();
  }
}
