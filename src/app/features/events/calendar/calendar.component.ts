import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.css']
})

export class CalendarComponent implements OnInit {

  name: string = 'calendar';

  constructor() { }

  ngOnInit(): void {
  }
}
