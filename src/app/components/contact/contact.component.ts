import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})

export class ContactComponent implements OnInit {

  name: string = 'contact';

  constructor() { }

  ngOnInit(): void {
  }
}
