import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-league-results',
  templateUrl: 'league-results.component.html',
  styleUrls: ['league-results.component.css']
})

export class LeagueResultsComponent implements OnInit {

  name: string = 'league results';

  constructor() { }

  ngOnInit(): void {
  }
}
