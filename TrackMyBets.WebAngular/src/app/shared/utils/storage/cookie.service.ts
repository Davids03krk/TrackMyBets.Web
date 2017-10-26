import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

    constructor(

    ) {

    }

    readCookie(keyName: string): string {
        var nameEQ = keyName + "=";
        var ca = document.cookie.split(';');

        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }

        return null;
    }

    updateCookie(keyName: string, dataValue: string, expiratedDays?: number, path: string = '/'): void {
        if (!expiratedDays)
            expiratedDays = 365 * 20;

        var date = new Date();
        date.setTime(date.getTime() + (expiratedDays * 24 * 60 * 60 * 1000));
        var expires: string = `expires=${date.toUTCString()}`;
        let cpath: string = path ? `; path=${path}` : '';
        document.cookie = `${keyName}=${dataValue}; ${expires}${cpath}`;
    }

    deleteCookie(keyName: string): void {
        this.updateCookie(keyName, '', -1);
    }
}
