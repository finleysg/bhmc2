import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }   from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { PaymentComponent } from './payments/payment.component';
import { SpinnerDirective } from './spinner/spinner.directive';
import { SpinnerService } from './spinner/spinner.service';
import { SpinnerButtonComponent } from './spinner/spinner-button.component';
import { MarkdownDirective } from './markdown/markdown.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        PaymentComponent,
        SpinnerDirective,
        SpinnerButtonComponent,
        MarkdownDirective
    ],
    providers: [
        SpinnerService
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PaymentComponent,
        SpinnerDirective,
        SpinnerButtonComponent,
        MarkdownDirective
    ]
})
export class SharedModule { }
