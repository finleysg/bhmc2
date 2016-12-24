import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'reset-password', component: LoginComponent },
  { path: 'reset-password-complete', component: LoginComponent },
  { path: 'reset-password-confirm', component: LoginComponent },
  { path: 'reset-password-sent', component: LoginComponent },
  { path: 'reset-password', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule {
}
