import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ToasterService } from 'angular2-toaster';

@Component({
    moduleId: module.id,
    templateUrl: 'fetch-password.component.html'
})

export class FetchPasswordComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(private toaster: ToasterService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit() { }

    getPassword() {
        // this.loading = true;
        // this.authenticationService.fetchPassword(this.model.email)
        //     .then(() => {
        //         this.toaster.pop('success', 'Email Verified', 'You should receive an email from us shortly.')
        //     })
        //     .catch((error: string) => {
        //         this.toaster.pop('error', 'Password Reset Error', error);
        //         this.loading = false;
        //     });
    }
}
