import { NgModule } from '@angular/core';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

@NgModule({
    imports: [
        ContactRoutingModule
    ],
    declarations: [
        ContactComponent
    ]
})
export class ContactModule {
}
