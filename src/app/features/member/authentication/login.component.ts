import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../core';
import { ToasterService } from 'angular2-toaster';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(private router: Router,
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
            .catch((err: string) => {
                this.loading = false;
                this.toaster.pop('error', 'Invalid Credentials', err);
            });
    }
}
