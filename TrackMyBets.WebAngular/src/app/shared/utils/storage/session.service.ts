import { Injectable } from '@angular/core';

declare var Modernizr: any;

@Injectable()
export class SessionService {

    constructor(

    ) {

    }

    getData(key: string): any {
        if (!this.isSessionStorageAvailable())
            return null;

        return sessionStorage.getItem(key);
    }

    saveData(key: string, value: any) {
        if (!this.isSessionStorageAvailable())
            return;

        sessionStorage.setItem(key, value);
    }

    removeData(key: string) {
        if (!this.isSessionStorageAvailable())
            return;

        sessionStorage.removeItem(key);
    }

    getDataObject(key: string): any {
        if (!this.isSessionStorageAvailable())
            return null;

        var item = sessionStorage.getItem(key);

        if (item != "" && item != undefined && item != null)
            return JSON.parse(item);

        return null;
    }

    saveDataObject(key: string, value: any) {
        if (!this.isSessionStorageAvailable())
            return;

        sessionStorage.setItem(key, JSON.stringify(value));
    }

    private isSessionStorageAvailable() {
        return (Modernizr.sessionstorage);
    }
}
