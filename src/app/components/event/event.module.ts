import {NgModule} from '@angular/core';
import {EventRoutingModule} from './event-routing.module';
import {CalendarComponent} from './calendar/calendar.component';

@NgModule({
  imports: [
    EventRoutingModule
  ],
  declarations: [
    CalendarComponent
  ]
})
export class EventModule {
}
