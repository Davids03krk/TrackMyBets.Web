import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { AppConfig } from '../../config/app.config';
import { LocalStorageService } from '../shared/utils/storage/local-storage.service'
import { CommunicationService } from '../shared/utils/communication/communication.service';
import { UserLoginModel, UserModel, UserAuthModel } from './user.model';

@Injectable()
export class UserService {
    constructor(
        private _http: Http,
        private _localStorageService: LocalStorageService,
        private _communicationService: CommunicationService
    ) {

    }
    
    login(userLogin: UserLoginModel): Observable<UserAuthModel> {
        let body = { name: "userLogin", value: userLogin };
        let url = AppConfig.urlApi + '/User/Login';

        let requestArgs = this._communicationService.createRequestArgsSync(url, body, null);

        return this._communicationService.post(requestArgs).map(
            response => response.json() as UserAuthModel
        );
    }

    logout() {
        this._localStorageService.removeData('userAuth');
    }

    register(userModel: UserModel): Observable<boolean> {
        let body = { name: "userModel", value: userModel };
        let url = AppConfig.urlApi + '/User/Register';

        let requestArgs = this._communicationService.createRequestArgsSync(url, body, null);

        return this._communicationService.post(requestArgs).map(
            response => response.ok
        );
    }
    
    //private jwt() {
    //    let currentUser = JSON.parse(this._localStorageService.getDataObject('userAuth'));
    //    if (currentUser && currentUser.token) {
    //        let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
    //        return new RequestOptions({ headers: headers });
    //    }
    //}
}
