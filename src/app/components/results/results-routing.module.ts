import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MajorResultsComponent} from './major/major-results.component';
import {LeagueResultsComponent} from './league/league-results.component';
import {MatchPlayComponent} from './match-play/match-play.component';
import {SeasonPointsComponent} from './season-points/season-points.component';
import {DamCupComponent} from './dam-cup/dam-cup.component';

const routes: Routes = [
  {
    path: 'results',
    // resolve: {
    //   data: DummyResolve
    // },
    children: [
      { path: 'league', component: LeagueResultsComponent },
      { path: 'majors', component: MajorResultsComponent },
      { path: 'match-play', component: MatchPlayComponent },
      { path: 'season-points', component: SeasonPointsComponent },
      { path: 'dam-cup', component: DamCupComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ResultsRoutingModule {
}
