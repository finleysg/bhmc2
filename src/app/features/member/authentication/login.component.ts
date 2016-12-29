import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../core/authentication.service';
import { ToasterService } from 'angular2-toaster';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private toaster: ToasterService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit() {
        // get return url from the auth service or default to '/'
        this.returnUrl = this.authenticationService.redirectUrl || '/';
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .then(() => this.router.navigate([this.returnUrl]))
            .catch( e => {
                this.loading = false;
                if (e.startsWith('400')) {
                    this.toaster.pop('error', 'Invalid Credentials', 'The username and/or password is no bueno');
                } else {
                    this.toaster.pop('error', 'Server Error', e.toString());
                }
            });
    }
}
