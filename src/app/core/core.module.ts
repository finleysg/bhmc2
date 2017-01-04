import { CalendarService } from './services/calendar.service';
import { AuthGuard } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LayoutService } from './services/layout.service';
import { AuthenticationService } from './services/authentication.service';
import { BhmcDataService } from './services/bhmc-data.service';
import { MemberService } from './services/member.service';

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
        AuthGuard
    ]
})
export class BhmcCoreModule {}
