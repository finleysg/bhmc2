import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PoliciesComponent}    from './policies.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'club', component: PoliciesComponent },
      { path: 'handicaps', component: PoliciesComponent },
      { path: 'rules', component: PoliciesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PoliciesRoutingModule {
}
