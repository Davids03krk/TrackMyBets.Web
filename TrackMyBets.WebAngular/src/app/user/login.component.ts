import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from './user.service';
import { UserLoginModel } from './user.model';
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
    userLoginModel: UserLoginModel;
    loading = false;
    returnUrl: string;
 
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) {
        this.userLoginModel = new UserLoginModel();
    }

    ngOnInit() {
        this.userService.logout();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        this.userService.login(this.userLoginModel).subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            erro => {
                this.loading = false;
            }
        );
    }
}
