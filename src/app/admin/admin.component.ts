import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../security/app-user';
import { AdminService } from './admin.service';

@Component({
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {
    users: AppUser[] = [];
    user: AppUser;
    userId;
    constructor(private router: Router, private adminService: AdminService) { }

    addUser() {
        this.router.navigate(['/userDetail', -1]);
    }
    searchUser() {
        this.adminService.getUserByName(this.userId)
        .subscribe((data) => {
            this.user = data;
            console.log('found: ', this.user);
        }, (error) => console.dir(error));

        // this.router.navigate(['/userDetail', this.userId]);
    }
    ngOnInit() {

    }
}
