import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../app.config';
import { UserLoginModel, UserModel } from './user.model';

@Injectable()
export class UserService {

    constructor(
        private http: Http,
        private config: AppConfig
    ) { }

    // Authentication
    login(userLogin: UserLoginModel) {
        return this.http.post(this.config.apiUrl + '/User/Login', { userLogin })
            .map((response: Response) => {
                let user = response.json();
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        localStorage.removeItem('currentUser');
    }


    //Operations
    getById(idUser: string) {
        return this.http.get(this.config.apiUrl + '/User/GetById/' + idUser, this.jwt()).map((response: Response) => response.json());
    }

    create(userModel: UserModel) {
        return this.http.post(this.config.apiUrl + '/User/Register', userModel, this.jwt());
    }

    update(userModel: UserModel) {
        return this.http.put(this.config.apiUrl + '/User/Update/' + userModel.IdUser, userModel, this.jwt());
    }

    delete(idUser: string) {
        return this.http.delete(this.config.apiUrl + '/User/Delete/' + idUser, this.jwt());
    }

    // Methods Private
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
