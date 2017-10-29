import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';
import { LocalStorageService } from '../shared/utils/storage/local-storage.service'
import { UserLoginModel, UserModel, UserAuthModel } from './user.model';

 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    userLoginModel: UserLoginModel;
    msgUserNoAuth: boolean;
    loading: boolean;
    returnUrl: string;

 
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _localStorageService: LocalStorageService,
        private _userService: UserService
    ) {
        this.userLoginModel = new UserLoginModel();
        this.loading = false;
        this.msgUserNoAuth = false;
    }

    ngOnInit() {
        this._userService.logout();
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;

        this._userService.login(this.userLoginModel).subscribe(
            (userAuth) => {
                if (userAuth && userAuth.token)
                    this._localStorageService.saveDataObject('userAuth', userAuth);

                this._router.navigate([this.returnUrl]);
            },
            (error) => {
                this.msgUserNoAuth = true;
                this.userLoginModel.nick = "";
                this.userLoginModel.password = "";
                this.loading = false;
            }
        );
    }

    private unauthorized() {
        this.msgUserNoAuth = true;
        this.userLoginModel.nick = "";
        this.userLoginModel.password = "";
    }
}
