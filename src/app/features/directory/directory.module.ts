import { NgModule } from '@angular/core';
import { DirectoryRoutingModule } from './directory-routing.module';
import { DirectoryComponent } from './directory.component';

@NgModule({
    imports: [
        DirectoryRoutingModule
    ],
    declarations: [
        DirectoryComponent
    ]
})
export class DirectoryModule {
}
