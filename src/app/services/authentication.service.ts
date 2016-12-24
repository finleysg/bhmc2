import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from './user';
import { Cookie } from 'ng2-cookies';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {

    private _authUrl: string = 'https://finleysg.pythonanywhere.com/rest-auth/';
    private currentUserSource: BehaviorSubject<User>;
    public currentUser$: Observable<User>;
    private _currentUser: User;

    constructor(private http: Http) {
        if (!this._currentUser) {
            let storedUser = localStorage.getItem('bhmc_user');
            if (!storedUser) {
                this._currentUser = new User();
                localStorage.setItem('bhmc_user', JSON.stringify(this._currentUser));
            } else {
                this._currentUser = Object.assign(new User(), JSON.parse(storedUser));
            }
        }
        this.currentUserSource = new BehaviorSubject(this._currentUser);
        this.currentUser$ = this.currentUserSource.asObservable();
    }

    login(username: string, password: string) {

        let email = '';
        if (username.indexOf('@') > 0) {
            email = username;
            username = '';
        }

        return this.postRequest('login', {username: username, email: email, password: password})
            .toPromise()
            .then(data => {
                if (data && data.key) {
                    localStorage.setItem('bhmc_token', data.key);
                    return this.getUser().toPromise();
                }
            })
            .then(user => {
                localStorage.setItem('bhmc_user', JSON.stringify(user));
                this._currentUser = Object.assign(new User(), user);
                this.currentUserSource.next(this._currentUser);
                return this._currentUser;
            });
    }

    logout() {
        return this.postRequest('logout', {})
            .toPromise()
            .then(() => this.resetUser())
            .catch((err: Response) => {
                console.log('Error in logout call - probably stale token');
                console.log(err.toString());
                this.resetUser();
            });
    }

    resetPassword(email: string) {
        return this.postRequest('password/reset', {email: email});
    }

    getUser(): Observable<User> {
        const url: string = this._authUrl + 'user/';
        return this.http.get(url, this.createOptions())
            .map((r: Response) => r.json() as User)
            .catch((e: Response) => {
                console.log(e.statusText);
                localStorage.removeItem('bhmc_token');
                return Observable.of(new User());
            });
    }

    private resetUser(): void {
        Cookie.delete('crsftoken');
        localStorage.removeItem('bhmc_token');
        this._currentUser = new User();
        this.currentUserSource.next(this._currentUser);
        localStorage.setItem('bhmc_user', JSON.stringify(this._currentUser));
    }

    private postRequest(resource: string, data: any) {
        const url: string = this._authUrl + resource + '/';
        return this.http.post(url, JSON.stringify(data), this.createOptions())
            .map((response: Response) => {
                return response.json() || {};
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
