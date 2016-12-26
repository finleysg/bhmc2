import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactMessage } from './contact-message';
import { ContactService } from './contact.service';
import { ToasterService } from 'angular2-toaster';
import { SpinnerButtonComponent } from '../../shared/spinner/spinner-button.component';

@Component({
    moduleId: module.id,
    templateUrl: 'contact.component.html',
    styleUrls: ['contact.component.css']
})
export class ContactComponent implements OnInit {

    @ViewChild(SpinnerButtonComponent)
    private spinnerButton: SpinnerButtonComponent;
    private message: ContactMessage;

    constructor(private contactService: ContactService,
                private toaster: ToasterService) {
    }

    ngOnInit(): void {
        this.message = new ContactMessage();
    }

    sendMessage(form: any, status: string) {
        if (!form.valid) {
            return;
        }
        console.info('contact for status: ' + status);
        this.spinnerButton.start();
        this.contactService.sendContactUsMessage(this.message)
            .then(
                () => {
                    this.spinnerButton.success();
                    this.toaster.pop(
                        'success',
                        'Message Sent',
                        'Your message has been sent. Someone will get back to you at the earliest opportunity.'
                    );
                }
            )
            .catch(
                err => {
                    this.spinnerButton.error();
                    this.toaster.pop(
                        'error',
                        'Message Error',
                        err.toString()
                    );
                }
            );
    }
}
