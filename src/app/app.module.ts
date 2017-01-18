import { MemberModule } from './features/member/member.module';
import { HomeModule } from './home/home.module';
import { PoliciesModule } from './features/policies/policies.module';
import { ResultsModule } from './features/results/results.module';
import { EventsModule } from './features/events/events.module';
import { DirectoryModule } from './features/directory/directory.module';
import { ContactModule } from './features/contact/contact.module';
import { NgModule, ErrorHandler, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { BhmcCoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CalendarModule } from './features/calendar/calendar.module';
import { BhmcErrorHandler } from './core/services/bhmc-error-handler.service';
import { ConfigService, ConfigLoader } from './app-config.service';
import { Http } from '@angular/http';
import { SeasonPointsModule } from './features/season-points/season-points.module';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BhmcCoreModule,
        SharedModule,
        LayoutModule,
        HomeModule,
        MemberModule,
        ContactModule,
        DirectoryModule,
        EventsModule,
        ResultsModule,
        PoliciesModule,
        CalendarModule,
        SeasonPointsModule,
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: ErrorHandler, useClass: BhmcErrorHandler },
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: ConfigLoader,
            deps: [ConfigService, Http],
            multi: true
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
