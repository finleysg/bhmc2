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

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TypeaheadModule.forRoot(),
        ModalModule.forRoot(),
        DropdownModule.forRoot(),
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
        TypeaheadModule,
        ModalModule,
        DropdownModule,
    ]
})
export class SharedModule { }
