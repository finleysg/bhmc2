import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<div class="jumbotron"><h1>Hello {{name}}</h1></div>`,
})
export class AppComponent  { name = 'Angular'; }
