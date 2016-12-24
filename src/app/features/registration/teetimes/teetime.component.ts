import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-teetime',
  templateUrl: 'teetime.component.html',
  styleUrls: ['teetime.component.css']
})

export class TeetimeComponent implements OnInit {

  name: string = 'tee times';

  constructor() { }

  ngOnInit(): void {
  }
}
