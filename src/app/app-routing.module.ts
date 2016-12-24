import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }        from './home/home.component';

const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'events', loadChildren: 'src/app/features/events/events.module#EventsModule'},
    {path: 'contact', loadChildren: 'src/app/features/contact/contact.module#ContactModule'},
    {path: 'policies', loadChildren: 'src/app/features/policies/policies.module#PoliciesModule'},
    {path: 'registration', loadChildren: 'src/acc/features/registration/registration.module#RegistrationModule'},
    {path: 'results', loadChildren: 'src/app/features/results/results.module#ResultsModule'},
    {path: 'member', loadChildren: 'src/app/features/member/member.module#MemberModule'},
    {path: 'directory', loadChildren: 'src/app/features/directory/directory.module#DirectoryModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
