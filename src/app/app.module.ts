import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {LayoutModule} from "./layout/layout.module";
import {HomeComponent} from "./components/home/home.component";
import {AppRoutingModule} from "./app-routing.module";

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule, LayoutModule ],
  declarations: [ AppComponent, HomeComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
