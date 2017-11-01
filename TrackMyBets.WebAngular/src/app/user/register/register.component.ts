import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RoutingConfig } from '../../../config/routing.config';
import { UserService } from '../user.service'
import { UserModel } from '../user.model'

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    userModel: UserModel;
    msgError: string;
    confirmPassword: string;

    constructor(
        private _router: Router,
        private _userService: UserService
    ) {
        this.userModel = new UserModel();
    }

    register() {
        if (this.validForm()) {
            this._userService.register(this.userModel).subscribe(
                () => {
                    this._router.navigate([RoutingConfig.LOGIN_USER]);
                },
                (error) => {
                    this.msgError = "ERROR. No se ha podido crear el usuario. Intentelo de nuevo mas tarde.";
                    this.clearForm();
                }
            );
        }
    }

    goToLogin() {
        this._router.navigate([RoutingConfig.LOGIN_USER]);
    }

    private validForm(): boolean {
        if (!this.userModel.nick || !this.userModel.password || !this.userModel.email) {
            this.msgError = "El nick, contraseña y email son datos obligatorios";
            return false;
        }

        if (this.userModel.password != this.confirmPassword) {
            this.msgError = "No coinciden las dos contraseñas introducidas";
            this.userModel.password = "";
            this.confirmPassword = "";
            return false;
        }
            
        return true;
    }

    private clearForm() {
        this.userModel.nick = "";
        this.userModel.password = "";
        this.userModel.email = "";
        this.userModel.name = "";
        this.userModel.surnameFirst = "";
        this.userModel.surnameSecond = "";
        this.userModel.address = "";
        this.userModel.phone = "";
        this.confirmPassword = "";
    }
}
