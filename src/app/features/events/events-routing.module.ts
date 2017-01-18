import { ReserveComponent } from './reserve/reserve.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './detail/event.component';
import { ReserveTableComponent } from './reserve/reserve-table.component';
import { PaymentTestComponent } from './test/payment-test.component';
import { RegisteredComponent } from './register/registered.component';
import { ReadonlyTableComponent } from './register/readonly-table.component';
import { AuthGuard, CanDeactivateGuard, EventDetailResolver } from '../../core';
import { CanRegisterResolver } from './services/can-register-resolver.service';
import { SeasonSignupComponent } from './register/season-signup.component';
import { MatchPlaySignupComponent } from './match-play/matchplay-signup.component';
import { MatchPlayComponent } from './match-play/match-play.component';

const routes: Routes = [
    { path: 'test', children: [
        { path: 'payments', component: PaymentTestComponent },
    ]},
    { path: 'events/:id', resolve: { eventDetail: EventDetailResolver }, children: [
        { path: 'detail', component: EventComponent },
        { path: 'register/:groupId', canActivate: [AuthGuard], resolve: { registrationGroup: CanRegisterResolver }, canDeactivate: [CanDeactivateGuard], component: RegisterComponent },
        { path: 'matchplay', component: MatchPlayComponent },
        { path: 'matchplay/register', canActivate: [AuthGuard], component: MatchPlaySignupComponent },
        { path: 'season-signup', canActivate: [AuthGuard], component: SeasonSignupComponent },
        { path: 'reserve', canActivate: [AuthGuard], component: ReserveComponent, children: [
            { path: ':course', component: ReserveTableComponent }
        ]},
        { path: 'registered', canActivate: [AuthGuard], component: RegisteredComponent, children: [
            { path: ':course', component: ReadonlyTableComponent }
        ]},
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [EventDetailResolver, CanRegisterResolver]
})
export class EventsRoutingModule { }
