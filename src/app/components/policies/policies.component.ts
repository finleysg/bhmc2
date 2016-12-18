import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-policies',
  templateUrl: 'policies.component.html',
  styleUrls: ['policies.component.css']
})

export class PoliciesComponent implements OnInit {

  name: string = 'policies';

  constructor() { }

  ngOnInit(): void {
  }
}
