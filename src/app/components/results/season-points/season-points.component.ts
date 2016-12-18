import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-season-points',
  templateUrl: 'season-points.component.html',
  styleUrls: ['season-points.component.css']
})

export class SeasonPointsComponent implements OnInit {

  name: string = 'season long points';

  constructor() { }

  ngOnInit(): void {
  }
}
