import { Injectable } from '@angular/core';
import { AppUser } from './app-user';
import { Subject } from 'rxjs';
import { AppUserAuth } from './app-user-auth';
import { LOGIN_MOCKS } from './login-mocks';

@Injectable()
export class SecurityService {

    private BEARER_TOKEN_ITEM = 'bearerToken';
    private securityObject: AppUserAuth = new AppUserAuth();
    securitySubject: Subject<AppUserAuth> = new Subject<AppUserAuth>();

    constructor() {

    }

    login(entity: AppUser): void {
        const theUser = LOGIN_MOCKS.find(user => user.userName.toLowerCase() === entity.userName.toLowerCase());
        this.securityObject = {...this.securityObject, ...theUser};

        if (this.securityObject.userName !== '') {
            localStorage.setItem(this.BEARER_TOKEN_ITEM, this.securityObject.bearerToken);
        }
        this.securitySubject.next(this.securityObject);
    }

    logout(): void {
        this.resetSecurityObject();
    }

    private resetSecurityObject() {
        this.securityObject.userName = '';
        this.securityObject.bearerToken = '';
        this.securityObject.isAuthenticated = false;

        this.securityObject.canAddProduct = false;
        this.securityObject.canAccessProduct = false;
        this.securityObject.canAddCategory = false;
        this.securityObject.canAccessCategories = false;
        this.securityObject.canSaveProduct = false;

        localStorage.removeItem(this.BEARER_TOKEN_ITEM);
        this.securitySubject.next(this.securityObject);
    }
}
