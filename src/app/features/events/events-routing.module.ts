import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [{
    path: '', children: [
        { path: 'detail', component: EventComponent },
        { path: 'calendar', component: CalendarComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EventsRoutingModule {
}
