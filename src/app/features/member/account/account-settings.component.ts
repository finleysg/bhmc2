import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SavedCard, User, AuthenticationService } from '../../../core';

@Component({
    moduleId: module.id,
    templateUrl: 'account-settings.component.html',
    // styleUrls: ['account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

    public savedCard: SavedCard;
    public user: User;

    constructor(private authService: AuthenticationService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.authService.currentUser$.subscribe(user => this.user = user);
        this.route.data
            .subscribe((data: { savedCard: SavedCard }) => {
                this.savedCard = data.savedCard;
            });
    }

    updateIdentity() {

    }

    changePassword() {

    }

    openPaymentReport() {

    }
}
