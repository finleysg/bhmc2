import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bhmc-directory',
  templateUrl: 'directory.component.html',
  styleUrls: ['directory.component.css']
})

export class DirectoryComponent implements OnInit {

  name: string = 'directory';

  constructor() { }

  ngOnInit(): void {
  }
}
