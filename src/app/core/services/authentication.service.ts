import { Injectable } from '@angular/core';
import { BhmcDataService } from './bhmc-data.service';
import { PasswordReset } from '../models/password-reset';
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

    private _rememberUser: boolean;
    private currentUserSource: BehaviorSubject<User>;
    public currentUser$: Observable<User>;
    private _currentUser: User;
    public redirectUrl: string;

    constructor(private dataService: BhmcDataService) {
        if (!this._currentUser) {
            let storedUser = this.getFromStorage('bhmc_user', true);
            if (!storedUser) {
                this._currentUser = new User();
                this.saveToStorage('bhmc_user', JSON.stringify(this._currentUser)); // session storage
            } else {
                this._rememberUser = true;
                this._currentUser = Object.assign(new User(), JSON.parse(storedUser)); // TODO: IE polyfill
            }
        }
        this.currentUserSource = new BehaviorSubject(this._currentUser);
        this.currentUser$ = this.currentUserSource.asObservable();
    }

    get user(): User {
        return this._currentUser;
    }

    login(username: string, password: string, remember: boolean): Promise<void> {

        this._rememberUser = remember;

        let email = '';
        if (username.indexOf('@') > 0) {
            email = username;
            username = '';
        }

        return this.dataService.postAuthRequest('login', {username: username, email: email, password: password})
            .flatMap((data: any) => {
                if (data && data.key) {
                    this.saveToStorage('bhmc_token', data.key);
                    return this.getUser();
                }
            })
            .map(user => {
                this.saveToStorage('bhmc_user', JSON.stringify(user));
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

    resetPassword(email: string): Promise<void> {
        return this.dataService.postAuthRequest('password/reset', {email: email}).toPromise();
    }

    changePassword(password1: string, password2: string): Promise<void> {
        return this.dataService.postAuthRequest('password/change', {
            'new_password1': password1,
            'new_password2': password2
        }).toPromise();
    }

    confirmReset(reset: PasswordReset): Promise<void> {
        return this.dataService.postAuthRequest('password/reset/confirm', reset.toJson()).toPromise();
    }

    updateAccount(data: User): Promise<void> {
        return this.dataService.patchAuthRequest('user', data).toPromise();
    }

    getUser(): Observable<User> {
        return this.dataService.getAuthRequest('user')
            .map((data: any) => {
                return new User().fromJson(data);
            })
            .catch(() => {
                this.removeFromStorage('bhmc_token');
                return Observable.of(new User());
            });
    }

    private resetUser(): void {
        Cookie.delete('crsftoken');
        this.removeFromStorage('bhmc_token');
        this._currentUser = new User();
        this.currentUserSource.next(this._currentUser);
        this.saveToStorage('bhmc_user', JSON.stringify(this._currentUser));
    }

    private getFromStorage(key: string, override: boolean = false): string {
        if (this._rememberUser || override) {
            return localStorage.getItem(key);
        }
        return sessionStorage.getItem(key);
    }

    private saveToStorage(key: string, data: string, override: boolean = false): void {
        if (this._rememberUser || override) {
            localStorage.setItem(key, data);
        } else {
            sessionStorage.setItem(key, data);
        }
    }

    private removeFromStorage(key: string, override: boolean = false): void {
        if (this._rememberUser || override) {
            localStorage.removeItem(key);
        }
        sessionStorage.removeItem(key);
    }
}
