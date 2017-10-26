import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../../config/app.config';
import { UserLoginModel, UserModel } from './user.model';

@Injectable()
export class UserService {

    constructor(
        private _http: Http
    ) {

    }
    
    login(userLogin: UserLoginModel) {
        return this._http.post(AppConfig.urlApi + '/User/Login', { userLogin })
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
    
    getById(idUser: string) {
        return this._http.get(AppConfig.urlApi + '/User/GetById/' + idUser, this.jwt()).map((response: Response) => response.json());
    }

    create(userModel: UserModel) {
        return this._http.post(AppConfig.urlApi + '/User/Register', userModel, this.jwt());
    }

    update(userModel: UserModel) {
        return this._http.put(AppConfig.urlApi + '/User/Update/' + userModel.IdUser, userModel, this.jwt());
    }

    delete(idUser: string) {
        return this._http.delete(AppConfig.urlApi + '/User/Delete/' + idUser, this.jwt());
    }
    
    private jwt() {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
