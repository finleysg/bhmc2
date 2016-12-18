import {NgModule} from '@angular/core';
import {PoliciesRoutingModule} from './policies-routing.module';
import {PoliciesComponent} from './policies.component';

@NgModule({
  imports: [
    PoliciesRoutingModule
  ],
  declarations: [
    PoliciesComponent
  ]
})
export class PoliciesModule {
}
