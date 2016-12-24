import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-calendar',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.css']
})

export class EventComponent implements OnInit {

  name: string = 'event';

  constructor() { }

  ngOnInit(): void {
  }
}
