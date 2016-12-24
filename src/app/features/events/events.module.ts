import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EventsRoutingModule } from './events-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { EventComponent } from './event.component';

@NgModule({
    imports: [
        EventsRoutingModule,
        SharedModule
    ],
    declarations: [
        CalendarComponent,
        EventComponent
    ]
})
export class EventsModule {
}
