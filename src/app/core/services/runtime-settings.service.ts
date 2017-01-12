import { Injectable } from '@angular/core';
import { WindowRef } from './window-reference.service';

@Injectable()
export class RuntimeSettings {

    private _isLocal: boolean;
    private _version: string = '1.0.0a';
    private _adminUrl: string = 'https://finleysg.pythonanywhere.com/admin';
    private _authUrl: string = 'https://finleysg.pythonanywhere.com/rest-auth/';
    private _apiUrl: string = 'https://finleysg.pythonanywhere.com/api/';
    private _stripeKey: string = 'pk_test_huMlHToXOZcuNXb9eQ7viBvY';
    private _ravenDsn: string = 'https://9b56cf753b264c9fa9be08b86846551b@sentry.io/126710';

    constructor(private $window: WindowRef) {
        this._isLocal = $window.nativeWindow.location.hostname.indexOf('localhost') >= 0;
        if (this._isLocal) {
            this._authUrl = 'http://localhost:8000/rest-auth/';
            this._apiUrl = 'http://localhost:8000/api/';
        }
    }

    get isLocal(): boolean {
        return this._isLocal;
    }

    get version(): string {
        return this._version;
    }

    get adminUrl(): string {
        return this._adminUrl;
    }

    get authUrl(): string {
        return this._authUrl;
    }

    get apiUrl(): string {
        return this._apiUrl;
    }

    get stripePublicKey(): string {
        return this._stripeKey;
    }

    get ravenDsn(): string {
        return this._ravenDsn;
    }
}
