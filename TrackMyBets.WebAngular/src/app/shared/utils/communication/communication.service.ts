import { Injectable } from '@angular/core';
import { Http, Request, RequestOptionsArgs, RequestMethod, ResponseContentType, URLSearchParams, Headers, Response, ResponseOptions, ReadyState } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { CommunicationRequestArgs, CommunicationVerbs, Body } from './communication-request-args.model';
import { CommunicationServer } from './communication.server';

declare var jQuery: JQueryStatic;

@Injectable()
export class CommunicationService {
    constructor(
        private _communicationServer: CommunicationServer
    ) {
        
    }

    public mapResponse<Type>(requestArgs: CommunicationRequestArgs): Observable<Type> {
        return this.get(requestArgs).map((response: Response) => {
            if (response.json().SessionEnded != null && response.json().SessionEnded) {
                return response.json() as Type;
            } else {
                return response.json() as Type;
            }
        });
    }

    public get(requestArgs: CommunicationRequestArgs): Observable<Response> {
        return this._communicationServer.get(requestArgs);
    }

    public getSync(requestArgs: CommunicationRequestArgs): Observable<Response> {
        return Observable.create((observer: Subject<Response>) => {
            function callback(res: any) {
                observer.next(res);
                observer.complete();
            }

            let body = new Body();
            if (requestArgs.body != null) {
                body = requestArgs.body;
            }

            jQuery.ajax({
                url: requestArgs.url,
                cache: requestArgs.cache,
                dataType: requestArgs.contentType,
                success: callback,
                async: false,
                data: body.value,
            });
        });
    }


    public put(requestArgs: CommunicationRequestArgs): Observable<Response> {
        return this._communicationServer.put(requestArgs);
    }

    public post(requestArgs: CommunicationRequestArgs): Observable<Response> {
        return this._communicationServer.post(requestArgs);
    }
    
    public delete(requestArgs: CommunicationRequestArgs): Observable<Response> {
        return this._communicationServer.delete(requestArgs);
    }

    public create(requestArgs: CommunicationRequestArgs): Observable<Response> {
        return this._communicationServer.create(requestArgs);
    }

    public createRequestArgs(url: string, paramArray: string[]): CommunicationRequestArgs {
        let params = new URLSearchParams();
        let requestArgs: CommunicationRequestArgs;

        if (paramArray != undefined) {
            for (var param in paramArray)
                params.append(param, paramArray[param]);
        }

        requestArgs = {
            url: url,
            params: params,
            cache: false
        };

        return requestArgs;
    }
    public createRequestArgsSync(url: string, body: Body, contentType: string): CommunicationRequestArgs {
        let params = new URLSearchParams();
        let requestArgs: CommunicationRequestArgs;

        requestArgs = {
            url: url,
            params: params,
            cache: false,
            contentType: contentType,
            body: body
        };

        return requestArgs;
    }
}
