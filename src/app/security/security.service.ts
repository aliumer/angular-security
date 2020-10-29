import { Injectable } from '@angular/core';
import { AppUser } from './app-user';
import { Subject } from 'rxjs';
import { AppUserAuth } from './app-user-auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:5000/api/security/';
const httpOptions = {
    headers: new HttpHeaders({ 'ContentType': 'application/json'})
};

@Injectable()
export class SecurityService {

    private BEARER_TOKEN_ITEM = 'BearerToken';
    private securityObject: AppUserAuth = new AppUserAuth();
    securitySubject: Subject<AppUserAuth> = new Subject<AppUserAuth>();

    constructor(private http: HttpClient) {
        this.securitySubject.next(this.securityObject);
    }

    getSecurityObject() {
        this.securitySubject.next(this.securityObject);
    }

    login(entity: AppUser): void {
        this.resetSecurityObject();
        this.http.post<AppUserAuth>(API_URL + 'login', entity, httpOptions).subscribe(response => {
            this.securityObject = {...this.securityObject, ...response};
            localStorage.setItem(this.BEARER_TOKEN_ITEM, this.securityObject.bearerToken);
            this.securitySubject.next(this.securityObject);
        });
    }

    logout(): void {
        this.resetSecurityObject();
    }

    hasClaim(claimType: string, claimValue?: string) {
        return this.isClaimValid(claimType, claimValue);
    }

    private resetSecurityObject() {
        this.securityObject.userName = '';
        this.securityObject.bearerToken = '';
        this.securityObject.isAuthenticated = false;
        this.securityObject.claims = [];
        localStorage.removeItem(this.BEARER_TOKEN_ITEM);
        this.securitySubject.next(this.securityObject);
    }

    private isClaimValid(claimType: string, claimValue?: string): boolean {
        let returnedValue = false;
        const auth: AppUserAuth = this.securityObject;
        if (auth) {
            if (claimType.indexOf(':') >= 0) {
                const words: string[] = claimType.split(':');
                claimType = words[0].toLowerCase();
                claimValue = words[1];
            } else {
                claimType = claimType.toLowerCase();
                claimValue = claimValue ? claimValue : 'true';
            }
            const claimFound = auth.claims.find(c => c.claimType.toLowerCase() === claimType);
            returnedValue = claimFound ? claimFound.claimValue === 'true' : false;
        } else {
            console.log('isClaimValid: No security object available.');
        }
        return returnedValue;
    }
}
