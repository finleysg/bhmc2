import { ReserveComponent } from './reserve/reserve.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { EventComponent } from './detail/event.component';
import { ReserveTableComponent } from './reserve/reserve-table.component';
import { PaymentTestComponent } from './test/payment-test.component';
import { RegisteredComponent } from './register/registered.component';
import { ReadonlyTableComponent } from './register/readonly-table.component';
import { SeasonSignupComponent } from './register/season-signup.component';
import { MatchPlaySignupComponent } from './match-play/matchplay-signup.component';
import { MatchPlayComponent } from './match-play/match-play.component';

@NgModule({
    imports: [
        EventsRoutingModule,
        SharedModule
    ],
    declarations: [
        EventComponent,
        RegisterComponent,
        ReserveComponent,
        ReserveTableComponent,
        PaymentTestComponent,
        RegisteredComponent,
        ReadonlyTableComponent,
        SeasonSignupComponent,
        MatchPlayComponent,
        MatchPlaySignupComponent
    ],
    providers: [
    ]
})
export class EventsModule { }
