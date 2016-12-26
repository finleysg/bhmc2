import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Cookie } from 'ng2-cookies';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BhmcDataService {

    private _isLocal: boolean;
    private _authUrl: string = 'https://finleysg.pythonanywhere.com/rest-auth/';
    private _apiUrl: string = 'https://finleysg.pythonanywhere.com/api/';

    constructor(private http: Http) {
        this._isLocal = window.location.hostname.indexOf('localhost') >= 0;
        // if (this._isLocal) {
        //     this._authUrl = 'http://localhost:8000/rest-auth/';
        //     this._apiUrl = 'http://localhost:8000/api/';
        // }
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
        return this.http.get(url, options)
            .map((r: Response) => r.json() || {})
            .catch(this.handleError);
    }

    private postRequest(url: string, data: any) {
        return this.http.post(url, JSON.stringify(data), this.createOptions())
            .map((response: Response) => {
                if (response.totalBytes > 0) { // TODO: undefined when no response body -- make sure this works with body
                    return response.json() || {};
                }
                return {}; // empty response
            })
            .catch(this.handleError);
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
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
