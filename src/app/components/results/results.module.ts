import {NgModule} from '@angular/core';
import {ResultsRoutingModule} from './results-routing.module';
import {DamCupComponent} from './dam-cup/dam-cup.component';
import {LeagueResultsComponent} from './league/league-results.component';
import {MajorResultsComponent} from './major/major-results.component';
import {MatchPlayComponent} from './match-play/match-play.component';
import {SeasonPointsComponent} from './season-points/season-points.component';

@NgModule({
  imports: [
    ResultsRoutingModule
  ],
  declarations: [
    DamCupComponent,
    LeagueResultsComponent,
    MajorResultsComponent,
    MatchPlayComponent,
    SeasonPointsComponent
  ]
})
export class ResultsModule {
}
