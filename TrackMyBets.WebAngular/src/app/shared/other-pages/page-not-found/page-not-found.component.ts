import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RoutingConfig } from '../../../../config/routing.config';

@Component({
    moduleId: module.id,
    templateUrl: 'page-not-found.component.html'
})

export class PageNotFoundComponent {
    constructor(
        private _router: Router
    ) {

    }

    goToHome() {
        this._router.navigate([RoutingConfig.HOME]);
    }
}
