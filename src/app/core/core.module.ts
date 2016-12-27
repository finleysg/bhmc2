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
    ]
})
export class BhmcCoreModule {}
