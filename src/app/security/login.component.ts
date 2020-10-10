import { Component, OnInit } from '@angular/core';
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

  constructor(private securityService: SecurityService) { }

  login() {
    this.securityService.login(this.user);
    this.securityService.securitySubject
    .subscribe((data) => {
      this.securityObject = data;
    });
  }

  ngOnInit() {
  }

}
