import { NgModule } from '@angular/core';
import { MemberRoutingModule } from './member-routing.module';
import { LoginComponent } from './authentication/login.component';
import { SharedModule } from '../../shared/shared.module';
import { ResetPasswordComponent } from './authentication/reset-password.component';
import { ResetPasswordSentComponent } from './authentication/reset-password-sent.component';
import { ResetPasswordCompleteComponent } from './authentication/reset-password-complete.component';
import { ResetPasswordConfirmComponent } from './authentication/reset-password-confirm.component';
import { AccountComponent } from './account/account.component';
import { AccountInfoComponent } from './account/account-info.component';
import { AccountSettingsComponent } from './account/account-settings.component';

@NgModule({
    imports: [
        MemberRoutingModule,
        SharedModule
    ],
    declarations: [
        LoginComponent,
        ResetPasswordComponent,
        ResetPasswordSentComponent,
        ResetPasswordCompleteComponent,
        ResetPasswordConfirmComponent,
        AccountComponent,
        AccountInfoComponent,
        AccountSettingsComponent
    ]
})
export class MemberModule { }
