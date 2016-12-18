import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {LayoutModule} from './layout/layout.module';
import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {LayoutService} from './services/layout.service';
import {UserService} from './services/user.service';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ComponentsModule
  ],
  declarations: [AppComponent],
  providers: [
    LayoutService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
