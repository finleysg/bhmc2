import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { SpinnerDirective } from './spinner/spinner.directive';
import { SpinnerService } from './spinner/spinner.service';
import { SpinnerButtonComponent } from './spinner/spinner-button.component';
import { MarkdownDirective } from './markdown/markdown.directive';
import { TypeaheadModule, ModalModule, DropdownModule } from 'ng2-bootstrap';
import { TimerComponent } from './timer/timer.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ToasterModule } from 'angular2-toaster';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ToasterModule,
        TypeaheadModule.forRoot(),
        ModalModule.forRoot(),
        DropdownModule.forRoot(),
        SlimLoadingBarModule.forRoot()
    ],
    declarations: [
        SpinnerDirective,
        SpinnerButtonComponent,
        MarkdownDirective,
        TimerComponent,
    ],
    providers: [
        SpinnerService
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        SpinnerDirective,
        SpinnerButtonComponent,
        MarkdownDirective,
        TimerComponent,
        ToasterModule,
        TypeaheadModule,
        ModalModule,
        DropdownModule,
        SlimLoadingBarModule,
    ]
})
export class SharedModule { }
