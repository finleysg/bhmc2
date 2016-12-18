import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-dam-cup',
  templateUrl: 'dam-cup.component.html',
  styleUrls: ['dam-cup.component.css']
})

export class DamCupComponent implements OnInit {

  name: string = 'dam cup';

  constructor() { }

  ngOnInit(): void {
  }
}
