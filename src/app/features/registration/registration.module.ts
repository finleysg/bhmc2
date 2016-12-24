import { NgModule } from '@angular/core';
import { RegistrationRoutingModule } from './registration-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { ReserveComponent } from './reserve/reserve.component';
import { TeetimeComponent } from './teetimes/teetime.component';

@NgModule({
    imports: [
        RegistrationRoutingModule,
        SharedModule
    ],
    declarations: [
        RegisterComponent,
        ReserveComponent,
        TeetimeComponent
    ]
})
export class RegistrationModule {
}
