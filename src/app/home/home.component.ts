import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {

  announcements: any = [];

  constructor() { }

  ngOnInit(): void {
    this.announcements.push({text: 'Now is the winter of our discontent made glorious summer by this son of York'});
  }
}
