import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { BhmcCoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BhmcCoreModule,
        SharedModule,
        LayoutModule
    ],
    declarations: [
        AppComponent,
        HomeComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
