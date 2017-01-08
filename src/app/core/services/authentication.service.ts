import { Injectable } from '@angular/core';
import { BhmcDataService } from './bhmc-data.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../models/user';
import { Cookie } from 'ng2-cookies';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {

    private currentUserSource: BehaviorSubject<User>;
    public currentUser$: Observable<User>;
    private _currentUser: User;
    public redirectUrl: string;

    constructor(private dataService: BhmcDataService) {
        if (!this._currentUser) {
            let storedUser = localStorage.getItem('bhmc_user');
            if (!storedUser) {
                this._currentUser = new User();
                localStorage.setItem('bhmc_user', JSON.stringify(this._currentUser));
            } else {
                this._currentUser = Object.assign(new User(), JSON.parse(storedUser)); // TODO: IE polyfill
            }
        }
        this.currentUserSource = new BehaviorSubject(this._currentUser);
        this.currentUser$ = this.currentUserSource.asObservable();
    }

    get user(): User {
        return this._currentUser;
    }

    login(username: string, password: string): Promise<void> {

        let email = '';
        if (username.indexOf('@') > 0) {
            email = username;
            username = '';
        }

        return this.dataService.postAuthRequest('login', {username: username, email: email, password: password})
            .flatMap((data: any) => {
                if (data && data.key) {
                    localStorage.setItem('bhmc_token', data.key);
                    return this.getUser();
                }
            })
            .map(user => {
                localStorage.setItem('bhmc_user', JSON.stringify(user));
                this._currentUser = user;
                this.currentUserSource.next(this._currentUser);
                return;
            })
            .toPromise();
    }

    logout(): Promise<void> {
        return this.dataService.postAuthRequest('logout', {})
            .toPromise()
            .then(() => this.resetUser())
            .catch(() => {
                this.resetUser();
            });
    }

    resetPassword(email: string) {
        return this.dataService.postAuthRequest('password/reset', {email: email});
    }

    getUser(): Observable<User> {
        return this.dataService.getAuthRequest('user')
            .map((data: any) => {
                return new User().fromJson(data);
            })
            .catch(() => {
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
}
