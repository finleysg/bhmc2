import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CalendarComponent} from './calendar/calendar.component';

const routes: Routes = [
  {
    path: 'calendar', component: CalendarComponent
    // resolve: {
    //   data: DummyResolve
    // },
    // children: [
    //   { path: 'club', component: PoliciesComponent },
    //   { path: 'handicap', component: PoliciesComponent },
    //   { path: 'rules', component: PoliciesComponent },
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class EventRoutingModule {
}
