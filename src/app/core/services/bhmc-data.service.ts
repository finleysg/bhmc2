import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { RuntimeSettings } from './runtime-settings.service';
import { BhmcErrorHandler } from './bhmc-error-handler.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BhmcDataService {

    // private _isLocal: boolean;
    private _authUrl: string = 'https://finleysg.pythonanywhere.com/rest-auth/';
    private _apiUrl: string = 'https://finleysg.pythonanywhere.com/api/';

    constructor(
        private http: Http,
        private loadingBar: SlimLoadingBarService,
        private errorHandler: BhmcErrorHandler,
        private settings: RuntimeSettings) {
        // this._isLocal = window.location.hostname.indexOf('localhost') >= 0;
        // if (this._isLocal) {
        //     this._authUrl = 'http://localhost:8000/rest-auth/';
        //     this._apiUrl = 'http://localhost:8000/api/';
        // }
        this._authUrl = settings.authUrl;
        this._apiUrl = settings.apiUrl;
    }

    getAuthRequest(resource: string, data?: any): Observable<any> {
        const url: string = this._authUrl + resource + '/';
        return this.getRequest(url, data);
    }

    getApiRequest(resource: string, data?: any): Observable<any> {
        const url: string = this._apiUrl + resource + '/';
        return this.getRequest(url, data);
    }

    postAuthRequest(resource: string, data: any): Observable<any> {
        const url: string = this._authUrl + resource + '/';
        return this.postRequest(url, data);
    }

    postApiRequest(resource: string, data: any): Observable<any> {
        const url: string = this._apiUrl + resource + '/';
        return this.postRequest(url, data);
    }

    private getRequest(url: string, data?: any): Observable<any> {
        let options = this.createOptions();
        let params = new URLSearchParams();
        if (data) {
            for (let key in data) {
                params.set(key, data[key]);
            }
            options.search = params;
        }
        this.loadingBar.color = 'blue';
        this.loadingBar.start();
        return this.http.get(url, options)
            .map((r: Response) => {
                this.loadingBar.color = 'green';
                this.loadingBar.complete();
                return r.json() || {};
            })
            .catch((err: any) => this.handleError(err));
    }

    private postRequest(url: string, data: any) {
        this.loadingBar.color = 'blue';
        this.loadingBar.start();
        return this.http.post(url, JSON.stringify(data), this.createOptions())
            .map((response: any) => {
                this.loadingBar.color = 'green';
                this.loadingBar.complete();
                if (response._body && response._body.length > 0) {
                    return response.json() || {};
                }
                return {}; // empty response
            })
            .catch((err: any) => this.handleError(err));
    }

    private createOptions(): RequestOptions {
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('bhmc_token');
        if (token) {
            headers.append('Authorization', 'Token ' + token);
        }
        // This cookie is added to responses by Django
        const csrf = Cookie.get('csrftoken');
        if (csrf) {
            headers.append('X-CSRFToken', csrf);
        }
        return new RequestOptions({headers: headers});
    }

    private handleError(error: Response | any) {
        this.loadingBar.color = 'red';
        this.loadingBar.complete();

        let message: string;
        if (error instanceof Response) {
            this.errorHandler.logResponse(error);
            if (error.status === 0) {
                message = `Could not reach the bhmc server because your internet connection 
                           was lost, the connection timed out, or the server is not responding.`;
            } else {
                const body = error.json() || {};
                if (body.non_field_errors) {
                    // django-rest-auth
                    message = body.non_field_errors[0];
                } else if (body.detail) {
                    // django-rest-framework
                    message = body.detail;
                } else {
                    message = JSON.stringify(body);
                }
            }
        } else {
            this.errorHandler.logError(error);
            message = error.message ? error.message : error.toString();
        }

        return Observable.throw(message);
    }
}
