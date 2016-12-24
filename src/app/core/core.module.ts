import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { LayoutService } from './layout.service';
import { AuthenticationService } from './authentication.service';

@NgModule({
    imports: [
        HttpModule,
    ],
    providers: [
        LayoutService,
        AuthenticationService
    ]
})
export class BhmcCoreModule {}