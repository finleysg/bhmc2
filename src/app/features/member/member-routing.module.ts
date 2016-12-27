import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentication/login.component';

const routes: Routes = [
    { path: 'member', children: [
        { path: 'login', component: LoginComponent },
        { path: 'reset-password', component: LoginComponent },
        { path: 'reset-password-complete', component: LoginComponent },
        { path: 'reset-password-confirm', component: LoginComponent },
        { path: 'reset-password-sent', component: LoginComponent },
        { path: 'reset-password', component: LoginComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MemberRoutingModule {
}
