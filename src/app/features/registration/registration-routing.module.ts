import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ReserveComponent } from './reserve/reserve.component';
import { TeetimeComponent } from './teetimes/teetime.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {path: 'register', component: RegisterComponent},
            {path: 'reserve', component: ReserveComponent},
            {path: 'teetimes', component: TeetimeComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class RegistrationRoutingModule {
}
