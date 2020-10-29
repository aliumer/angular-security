import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppUser } from '../security/app-user';
import { AdminService } from './admin.service';

@Component({
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {

    user: AppUser;
    originalUser: AppUser;
    claim;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private adminService: AdminService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        this.createOrLoadUser(id);
    }

    createOrLoadUser(id?: string) {
        if (!id) {
            this.initUser();
        } else {
            this.adminService.getUserById(id)
                .subscribe(user => {
                    this.user = user;
                    if (!this.user.claims) {
                        this.claim = {
                            claimType: '',
                            claimValue: 'false'
                        };
                    }
                    this.originalUser = { ...this.user };
                });
        }
    }

    initUser() {
        this.user = new AppUser();
        this.claim = {
            claimType: '',
            claimValue: 'false'
        };
    }

    saveData() {
        if (this.user.userId) {
            console.log(this.claim);
            this.user.claims = [{...this.claim}];
            this.adminService.updateUser(this.user)
                .subscribe(user => this.user,
                    (err) => console.log(err),
                    () => this.dataSaved());
        } else {
            this.adminService.createUser(this.user)
                .subscribe(user => this.user,
                    (error) => console.log(error),
                    () => this.dataSaved());
        }
    }

    dataSaved() {
        this.goBack();
    }

    cancel() {
        this.goBack();
    }

    goBack(): void {
        this.location.back();
    }
}
