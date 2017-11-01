import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RoutingConfig } from '../../../config/routing.config';
import { UserService } from '../user.service';
import { LocalStorageService } from '../../shared/utils/storage/local-storage.service'
import { UserLoginModel, UserModel, UserAuthModel } from '../user.model';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    userLoginModel: UserLoginModel;
    showMsgUserNoAuth: boolean;
    returnUrl: string;

 
    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _localStorageService: LocalStorageService,
        private _userService: UserService
    ) {
        this.userLoginModel = new UserLoginModel();
        this.showMsgUserNoAuth = false;
    }

    ngOnInit() {
        this._userService.logout();
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this._userService.login(this.userLoginModel).subscribe(
            (userAuth) => {
                if (userAuth && userAuth.token)
                    this._localStorageService.saveDataObject('userAuth', userAuth);

                this._router.navigate([this.returnUrl]);
            },
            (error) => {
                this.showMsgUserNoAuth = true;
                this.clearForm();
            }
        );
    }

    goToRegister() {
        this._router.navigate([RoutingConfig.REGISTER_USER]);
    }

    private unauthorized() {
        this.showMsgUserNoAuth = true;
        this.userLoginModel.nick = "";
        this.userLoginModel.password = "";
    }

    private clearForm() {
        this.userLoginModel.nick = "";
        this.userLoginModel.password = "";
    }
}
