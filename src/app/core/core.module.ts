import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LayoutService } from './layout.service';
import { AuthenticationService } from './authentication.service';
import { BhmcDataService } from './bhmc-data.service';

@NgModule({
    imports: [
        HttpModule,
    ],
    providers: [
        LayoutService,
        BhmcDataService,
        AuthenticationService,
    ]
})
export class BhmcCoreModule {}
