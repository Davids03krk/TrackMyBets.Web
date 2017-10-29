import { Injectable } from '@angular/core';

declare var Modernizr: any;

@Injectable()
export class LocalStorageService {

    constructor(

    ) {

    }

    getData(key: string): any {
        if (!this.isLocalStorageAvailable())
            return null;

        return localStorage.getItem(key);
    }

    saveData(key: string, value: string) {
        if (!this.isLocalStorageAvailable())
            return;

        localStorage.setItem(key, value);
    }

    removeData(key: string) {
        if (!this.isLocalStorageAvailable())
            return;

        localStorage.removeItem(key);
    }

    getDataObject<T>(key: string): T {
        if (!this.isLocalStorageAvailable())
            return null;

        var item = localStorage.getItem(key);

        if (item != "" && typeof item != "undefined" && item != "undefined" && item != null)
            return JSON.parse(item);

        return null;
    }

    saveDataObject<T>(key: string, value: T) {
        if (!this.isLocalStorageAvailable())
            return;

        localStorage.setItem(key, JSON.stringify(value));
    }

    isLocalStorageAvailable(): boolean {
        return Modernizr.localstorage;
    }
}
