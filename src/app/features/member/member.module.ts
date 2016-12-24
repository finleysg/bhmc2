import { NgModule } from '@angular/core';
import { MemberRoutingModule } from './member-routing.module';
import { LoginComponent } from './authentication/login.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        MemberRoutingModule,
        SharedModule
    ],
    declarations: [
        LoginComponent
    ]
})
export class MemberModule {
}
