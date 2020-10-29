import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../security/app-user';

const API_URL = 'http://localhost:5000/api/admin/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class AdminService {

    constructor(private http: HttpClient) {

    }

    createUser(user: AppUser): Observable<AppUser> {
        return this.http.post<AppUser>(API_URL, user, httpOptions);
    }

    updateUser(user: AppUser): Observable<AppUser> {
        return this.http.put<AppUser>(API_URL, user, httpOptions);
    }

    getUserById(userId: string) {
        return this.http.get<AppUser>(API_URL + userId, httpOptions);
    }

    getUserByName(userName: string) {
        return this.http.get<AppUser>(API_URL + 'getbyname/' + userName, httpOptions);
    }
}
