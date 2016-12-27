import { TeetimeComponent } from './teetimes/teetime.component';
import { ReserveComponent } from './reserve/reserve.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [
    { path: 'calendar', component: CalendarComponent },
    { path: 'event/:id', children: [
        { path: 'detail', component: EventComponent },
        { path: 'register', component: RegisterComponent }, 
        { path: 'reserve', component: ReserveComponent },
        { path: 'teetimes', component: TeetimeComponent },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class EventsRoutingModule { }
