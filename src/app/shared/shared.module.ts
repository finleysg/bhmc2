import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule }  from '@angular/router';
import { SpinnerDirective } from './spinner/spinner.directive';
import { SpinnerService } from './spinner/spinner.service';
import { SpinnerButtonComponent } from './spinner/spinner-button.component';
import { MarkdownDirective } from './markdown/markdown.directive';
import { TypeaheadModule, ModalModule, DropdownModule } from 'ng2-bootstrap';
import { TimerComponent } from './timer/timer.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ToasterModule } from 'angular2-toaster';
import { PaymentComponent } from './payments/payment.component';
import { UploadComponent } from './upload/upload.component';
import { OfflineRegistrationComponent } from './offline-register/offline-registration.component';
import { OfflineRegistrationForm } from './offline-register/offline-registration-form.service';
import { DownloadCsvComponent } from './download/download-csv.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ToasterModule,
        TypeaheadModule.forRoot(),
        ModalModule.forRoot(),
        DropdownModule.forRoot(),
        SlimLoadingBarModule.forRoot()
    ],
    declarations: [
        PaymentComponent,
        SpinnerDirective,
        SpinnerButtonComponent,
        MarkdownDirective,
        TimerComponent,
        UploadComponent,
        OfflineRegistrationComponent,
        DownloadCsvComponent,
    ],
    providers: [
        SpinnerService,
        OfflineRegistrationForm
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
        PaymentComponent,
        UploadComponent,
        OfflineRegistrationComponent,
        DownloadCsvComponent,
    ]
})
export class SharedModule { }
