import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-match-play',
  templateUrl: 'match-play.component.html',
  styleUrls: ['match-play.component.css']
})

export class MatchPlayComponent implements OnInit {

  name: string = 'match-play';

  constructor() { }

  ngOnInit(): void {
  }
}
