import { Component, OnInit } from '@angular/core';
import { User, AuthenticationService } from '../../../core';

@Component({
    moduleId: module.id,
    templateUrl: 'account-info.component.html',
    // styleUrls: ['account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

    public user: User;
    public editInfo: boolean;
    public editContact: boolean;

    constructor(private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.authService.currentUser$.subscribe(user => this.user = user);
    }

    updatePersonalInfo(infoType: string, form: any) {
        // TODO
    }
}
