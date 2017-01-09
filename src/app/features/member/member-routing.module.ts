import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login.component';
import { ResetPasswordComponent } from './authentication/reset-password.component';
import { ResetPasswordSentComponent } from './authentication/reset-password-sent.component';
import { ResetPasswordCompleteComponent } from './authentication/reset-password-complete.component';
import { ResetPasswordConfirmComponent } from './authentication/reset-password-confirm.component';
import { AuthGuard, StripeDetailsResolver } from '../../core';
import { AccountComponent } from './account/account.component';
import { AccountSettingsComponent } from './account/account-settings.component';
import { AccountInfoComponent } from './account/account-info.component';
import { ChangePasswordComponent } from './account/change-password.component';

const routes: Routes = [
    {
        path: 'member', children: [
            { path: 'login', component: LoginComponent },
            { path: 'reset-password', component: ResetPasswordComponent },
            { path: 'reset-password-complete', component: ResetPasswordCompleteComponent },
            { path: 'reset-password-confirm/:uid/:token', component: ResetPasswordConfirmComponent },
            { path: 'reset-password-sent', component: ResetPasswordSentComponent },
            { path: 'account', canActivate: [AuthGuard], component: AccountComponent, children: [
                { path: 'info', component: AccountInfoComponent },
                { path: 'settings', resolve: { savedCard: StripeDetailsResolver }, component: AccountSettingsComponent },
                { path: 'change-password', component: ChangePasswordComponent },
            ]},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MemberRoutingModule {
}
