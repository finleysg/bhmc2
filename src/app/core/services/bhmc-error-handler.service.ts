import { Injectable, ErrorHandler } from '@angular/core';
import { RuntimeSettings } from './runtime-settings.service';
import { Response } from '@angular/http';
import * as Raven from 'raven-js';

@Injectable()
export class BhmcErrorHandler extends ErrorHandler {

    constructor(private settings: RuntimeSettings) {
        super();
        if (!settings.isLocal) {
            const options = { 'release': settings.version, 'autoBreadcrumbs': { 'xhr': false }};
            Raven.config(settings.ravenDsn, options).install();
        }
    }

    handleError(err: any): void {
        if (this.settings.isLocal) {
            super.handleError(err);
        } else {
            Raven.captureException(err.originalError);
        }
    }

    logError(err: any): void {
        if (this.settings.isLocal) {
            console.error(err.toString());
        } else {
            Raven.captureException(err);
        }
    }

    logResponse(response: Response) {
        if (this.settings.isLocal) {
            // TODO: handle text or blob responses
            console.info(`${response.status}: ${JSON.stringify(response.json())}`)
        } else {
            // TODO
        }
    }

    logWarning(message: string): void {
        if (this.settings.isLocal) {
            console.warn(message);
        } else {
            Raven.captureMessage(message, {level: 'warning'});
        }
    }

    logMessage(message: string): void {
        if (this.settings.isLocal) {
            console.info(message);
        }
    }
}
