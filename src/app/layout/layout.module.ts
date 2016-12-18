import {NgModule} from '@angular/core';
import {PageHeaderComponent} from './page-header/page-header.component';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {ChangeLayoutDirective} from "./sidebar/change-layout.directive";
import {LayoutService} from "./sidebar/layout.service";
import {ToggleSubmenuDirective} from "./sidebar/toggle-submenu.directive";
import {UserService} from "./user/user.service";
import {RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";
import {LayoutComponent} from "./layout.component";

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  declarations: [
    LayoutComponent,
    PageHeaderComponent,
    SidebarComponent,
    ChangeLayoutDirective,
    ToggleSubmenuDirective
  ],
  providers: [
    LayoutService,
    UserService
  ],
  exports: [
    LayoutComponent
  ]
})
export class LayoutModule {
}
