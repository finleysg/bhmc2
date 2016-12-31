import { EventDetailService } from './event-detail.service';
import { TeetimeComponent } from './teetimes/teetime.component';
import { ReserveComponent } from './reserve/reserve.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './detail/event.component';
import { ReserveTableComponent } from './reserve/reserve-table.component';
import { TypeaheadModule } from 'ng2-bootstrap';

@NgModule({
    imports: [
        EventsRoutingModule,
        SharedModule,
        TypeaheadModule
    ],
    declarations: [
        CalendarComponent,
        EventComponent,
        RegisterComponent,
        ReserveComponent,
        ReserveTableComponent,
        TeetimeComponent
    ],
    providers: [
        EventDetailService
    ]
})
export class EventsModule { }
