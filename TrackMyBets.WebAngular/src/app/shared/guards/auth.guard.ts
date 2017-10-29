import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LocalStorageService } from '../utils/storage/local-storage.service'

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(
        private _router: Router,
        private _localStorageService: LocalStorageService
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this._localStorageService.getDataObject('userAuth'))
            return true;

        this._router.navigate(['login'], { queryParams: { returnUrl: state.url } });

        return false;
    }
}
