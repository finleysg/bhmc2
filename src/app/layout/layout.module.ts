import { NgModule } from '@angular/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChangeLayoutDirective } from './page-header/change-layout.directive';
import { ToggleSubmenuDirective } from './sidebar/toggle-submenu.directive';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        ToasterModule
    ],
    declarations: [
        LayoutComponent,
        PageHeaderComponent,
        SidebarComponent,
        ChangeLayoutDirective,
        ToggleSubmenuDirective
    ],
    exports: [
        LayoutComponent
    ]
})
export class LayoutModule {
}
