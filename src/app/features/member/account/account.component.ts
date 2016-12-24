import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-account',
  templateUrl: 'account.component.html',
  styleUrls: ['account.component.css']
})

export class AccountComponent implements OnInit {

  name: string = 'account';

  constructor() { }

  ngOnInit(): void {
  }
}
