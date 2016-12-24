import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  moduleId: module.id,
  templateUrl: 'reset-password.component.html'
})

export class ResetPasswordComponent implements OnInit {
  model: any = {};
  loading = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  resetPassword() {
    this.loading = true;
    this.authenticationService.resetPassword(this.model.email)
      .subscribe(
        data => {
          this.router.navigate(['reset-password-sent']);
        },
        error => {
          window.alert(error);
          this.loading = false;
        });
  }
}
