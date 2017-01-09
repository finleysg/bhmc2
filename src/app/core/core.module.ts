import { CalendarService } from './services/calendar.service';
import { AuthGuard } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LayoutService } from './services/layout.service';
import { AuthenticationService } from './services/authentication.service';
import { BhmcDataService } from './services/bhmc-data.service';
import { MemberService } from './services/member.service';
import { DialogService } from './services/dialog.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { WindowRef } from './services/window-reference.service';
import { RuntimeSettings } from './services/runtime-settings.service';
import { BhmcErrorHandler } from './services/bhmc-error-handler.service';
import { StripeDetailsResolver } from './services/stripe-details-resolver.service';

@NgModule({
    imports: [
        HttpModule,
    ],
    providers: [
        LayoutService,
        BhmcDataService,
        AuthenticationService,
        MemberService,
        CalendarService,
        DialogService,
        WindowRef,
        AuthGuard,
        CanDeactivateGuard,
        RuntimeSettings,
        BhmcErrorHandler,
        StripeDetailsResolver,
    ]
})
export class BhmcCoreModule {}
