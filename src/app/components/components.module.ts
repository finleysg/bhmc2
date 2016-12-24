import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentsRoutingModule} from './components-routing.module';
import {EventModule} from './event/event.module';
import {PoliciesModule} from './policies/policies.module';
import {ResultsModule} from './results/results.module';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {DirectoryComponent} from './directory/directory.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthModule} from './auth/auth.module';

@NgModule({
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    EventModule,
    PoliciesModule,
    ResultsModule,
    AuthModule
  ],
  declarations: [
    HomeComponent,
    ContactComponent,
    DirectoryComponent,
    ProfileComponent
  ]
})
export class ComponentsModule {
}
