import { AuthGuard } from '../../core';
import { EventDetailResolver } from './event-detail-resolver.service';
import { TeetimeComponent } from './teetimes/teetime.component';
import { ReserveComponent } from './reserve/reserve.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './detail/event.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ReserveTableComponent } from './reserve/reserve-table.component';

const routes: Routes = [
    { path: 'calendar/:year/:month', component: CalendarComponent },
    { path: 'events/:id', resolve: { eventDetail: EventDetailResolver }, children: [
        { path: 'detail', component: EventComponent },
        { path: 'register', canActivate: [AuthGuard], component: RegisterComponent },
        { path: 'reserve', canActivate: [AuthGuard], component: ReserveComponent, children: [
            { path: ':course', component: ReserveTableComponent }
        ]},
        { path: 'teetimes', canActivate: [AuthGuard], component: TeetimeComponent },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [EventDetailResolver]
})
export class EventsRoutingModule { }
