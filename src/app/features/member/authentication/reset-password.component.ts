import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { ToasterService } from 'angular2-toaster';

@Component({
    moduleId: module.id,
    templateUrl: 'reset-password.component.html'
})

export class ResetPasswordComponent implements OnInit {
    model: any = {};
    loading = false;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private toaster: ToasterService,
                private authenticationService: AuthenticationService) {
    }

    ngOnInit() { }

    resetPassword() {
        this.loading = true;
        this.authenticationService.resetPassword(this.model.email)
            .then(() => {
                this.router.navigate(['reset-password-sent'], {relativeTo: this.route.parent});
            })
            .catch((error: string) => {
                this.toaster.pop('error', 'Password Reset Error', error);
                this.loading = false;
            });
    }
}
