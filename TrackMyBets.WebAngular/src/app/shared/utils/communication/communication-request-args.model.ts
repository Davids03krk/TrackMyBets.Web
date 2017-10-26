import { URLSearchParams, ResponseContentType, ReadyState } from '@angular/http';

export interface CommunicationRequestArgs {
    url: string;
    params?: URLSearchParams;
    body?: Body;
    contentType?: string;
    responseType?: ResponseContentType;
    cache?: boolean;
    sendLastInteractDate?: boolean;
}

export class Body {
    name: string;
    value: Object;
};

export enum CommunicationVerbs {
    "GET",
    "POST",
    "PUT",
    "DELETE"
};
