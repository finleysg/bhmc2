import { CalendarService } from './calendar.service';
import { AuthGuard } from './auth-guard.service';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LayoutService } from './layout.service';
import { AuthenticationService } from './authentication.service';
import { BhmcDataService } from './bhmc-data.service';
import { MemberService } from './member.service';

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
