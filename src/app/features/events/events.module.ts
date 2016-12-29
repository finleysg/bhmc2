import { EventDetailService } from './event-detail.service';
import { TeetimeComponent } from './teetimes/teetime.component';
import { ReserveComponent } from './reserve/reserve.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './detail/event.component';

@NgModule({
    imports: [
        EventsRoutingModule,
        SharedModule
    ],
    declarations: [
        CalendarComponent,
        EventComponent,
        RegisterComponent,
        ReserveComponent,
        TeetimeComponent
    ],
    providers: [
        EventDetailService
    ]
})
export class EventsModule { }
