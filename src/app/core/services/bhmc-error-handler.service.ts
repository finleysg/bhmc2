import { Injectable, ErrorHandler } from '@angular/core';
import { Response } from '@angular/http';
import { ConfigService } from '../../app-config.service';
import { AppConfig } from '../../app-config';
import * as Raven from 'raven-js';

@Injectable()
export class BhmcErrorHandler extends ErrorHandler {

    private config: AppConfig

    constructor(
        private configService: ConfigService
    ) {
        super();
        this.config = configService.config;
        if (!this.config.isLocal) {
            const options = { 'release': configService.config.version, 'autoBreadcrumbs': { 'xhr': false }};
            Raven.config(this.config.ravenDsn, options).install();
        }
    }

    handleError(err: any): void {
        if (this.config.isLocal) {
            super.handleError(err);
        } else {
            Raven.captureException(err.originalError);
        }
    }

    logError(err: any): void {
        if (this.config.isLocal) {
            console.error(err.toString());
        } else {
            Raven.captureException(err);
        }
    }

    logResponse(response: Response) {
        if (this.config.isLocal) {
            // TODO: handle text or blob responses
            console.info(`${response.status}: ${JSON.stringify(response.json())}`)
        } else {
            // TODO
        }
    }

    logWarning(message: string): void {
        if (this.config.isLocal) {
            console.warn(message);
        } else {
            Raven.captureMessage(message, {level: 'warning'});
        }
    }

    logMessage(message: string): void {
        if (this.config.isLocal) {
            console.info(message);
        }
    }
}
