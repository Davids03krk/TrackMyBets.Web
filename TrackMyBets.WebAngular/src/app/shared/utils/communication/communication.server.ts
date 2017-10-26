import { Injectable } from '@angular/core';
import { Response, ResponseContentType, URLSearchParams, Headers, RequestMethod, Http, RequestOptionsArgs } from '@angular/http';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CommunicationRequestArgs, CommunicationVerbs, Body } from './communication-request-args.model';

@Injectable()
export class CommunicationServer {

    constructor(
        private _http: Http
    ) {

    }

    public get(requestArgs: CommunicationRequestArgs): Observable<Response> {
        let params = (requestArgs.params == null) ? new URLSearchParams() : requestArgs.params;
        let headers = new Headers();

        if (!requestArgs.cache)
            this.addCacheParam(params);

        if (requestArgs.contentType != null)
            this.addContentTypeHeader(headers, requestArgs.contentType);

        let body = new Body();
        if (requestArgs.body != null) {
            body = requestArgs.body;
        }

        let options = this.createOptions(
            RequestMethod.Get,
            params,
            headers,
            requestArgs.responseType,
            body.value
        );

        return this._http.get(requestArgs.url, options);
    }

    public put(requestArgs: CommunicationRequestArgs): Observable<Response> {
        let contentType = (requestArgs.contentType == null) ? 'application/json; charset=utf-8' : requestArgs.contentType;
        let headers = new Headers({});
        let responseType = (requestArgs.responseType == null) ? ResponseContentType.Json : requestArgs.responseType;
        this.addContentTypeHeader(headers, contentType);
        let options = this.createOptions(
            RequestMethod.Put,
            requestArgs.params,
            headers,
            responseType,
            undefined
        );

        return this._http.put(requestArgs.url, requestArgs.body ? requestArgs.body.value : "", options);
    }

    public post(requestArgs: CommunicationRequestArgs): Observable<Response> {
        let headers = new Headers({});

        if (requestArgs.contentType != null)
            this.addContentTypeHeader(headers, requestArgs.contentType);

        let body = new Body();
        if (requestArgs.body != null) {
            body = requestArgs.body;
        }

        let options = this.createOptions(
            RequestMethod.Post,
            requestArgs.params,
            headers,
            requestArgs.responseType,
            body.value);

        return this._http.post(requestArgs.url, requestArgs.body, options);
    }

    public delete(requestArgs: CommunicationRequestArgs): Observable<Response> {
        let contentType = (requestArgs.contentType == null) ? 'application/json; charset=utf-8' : requestArgs.contentType;
        let headers = new Headers({});
        let responseType = (requestArgs.responseType == null) ? ResponseContentType.Json : requestArgs.responseType;
        this.addContentTypeHeader(headers, contentType);
        let body = new Body();
        if (requestArgs.body != null) {
            body = requestArgs.body;
        }

        let options = this.createOptions(
            RequestMethod.Delete,
            requestArgs.params,
            headers,
            responseType,
            body.value
        );

        return this._http.delete(requestArgs.url, options);
    }

    public create(requestArgs: CommunicationRequestArgs): Observable<Response> {
        let params = (requestArgs.params == null) ? new URLSearchParams() : requestArgs.params;
        let contentType = (requestArgs.contentType == null) ? 'application/json; charset=utf-8' : requestArgs.contentType;
        let headers = new Headers({});
        let responseType = (requestArgs.responseType == null) ? ResponseContentType.Json : requestArgs.responseType;
        this.addContentTypeHeader(headers, contentType);
        let options = this.createOptions(
            RequestMethod.Post,
            requestArgs.params,
            headers,
            responseType,
            undefined
        );

        return this._http.post(requestArgs.url, requestArgs.body ? requestArgs.body.value : "", options);
    }

    private createOptions(method: RequestMethod, search: URLSearchParams, headers: Headers, responseType: ResponseContentType, body: any): RequestOptionsArgs {
        if (headers == null) headers = new Headers();

        headers.append("X-Requested-With", "XMLHttpRequest");
        let options: RequestOptionsArgs = {
            method: method,
            search: search,
            headers: headers,
            responseType: responseType,
            body: body,
        };

        return options;
    }

    private addCacheParam(params: URLSearchParams): void {
        if (params.has('_'))
            throw new Error('The param "_" is already set');

        params.append('_', Date.now().toString());
    }

    private addContentTypeHeader(headers: Headers, contentType: string): void {
        if (headers.has('Content-Type'))
            throw new Error('The header "Content-Type" is already set');

        headers.append('Content-Type', contentType);
    }
}
