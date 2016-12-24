import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-major-results',
  templateUrl: 'major-results.component.html',
  styleUrls: ['major-results.component.css']
})

export class MajorResultsComponent implements OnInit {

  name: string = 'major results';

  constructor() { }

  ngOnInit(): void {
  }
}
