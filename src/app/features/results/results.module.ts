import { NgModule } from '@angular/core';
import { ResultsRoutingModule } from './results-routing.module';
import { DamCupComponent } from '../dam-cup/dam-cup.component';
import { LeagueResultsComponent } from './league/league-results.component';
import { MajorResultsComponent } from './major/major-results.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        ResultsRoutingModule,
        SharedModule
    ],
    declarations: [
        DamCupComponent,
        LeagueResultsComponent,
        MajorResultsComponent,
    ]
})
export class ResultsModule {
}
