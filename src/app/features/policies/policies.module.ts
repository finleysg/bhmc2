import { PolicyService } from './policy.service';
import { NgModule } from '@angular/core';
import { PoliciesRoutingModule } from './policies-routing.module';
import { PoliciesComponent } from './policies.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        PoliciesRoutingModule,
        SharedModule
    ],
    declarations: [
        PoliciesComponent
    ],
    providers: [
        PolicyService
    ]
})
export class PoliciesModule {
}
