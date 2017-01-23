var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
import { SeasonPointsModule } from './features/season-points/season-points.module';
import { DamCupModule } from './features/dam-cup/dam-cup.module';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
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
                DamCupModule
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
                    deps: [ConfigService],
                    multi: true
                }
            ],
            bootstrap: [
                AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=app.module.js.map