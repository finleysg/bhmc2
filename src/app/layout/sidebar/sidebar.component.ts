import { Calendar } from '../../core/models/calendar';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../core/models/user';
import { LayoutService } from '../../core/services/layout.service';
import { AuthenticationService } from '../../core/services/authentication.service';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'bhmc-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit, AfterViewInit {

    user: User;
    public isOpen: boolean;
    public adminUrl: string;
    public currentMonth: any;

    constructor(private _router: Router,
                private _route: ActivatedRoute,
                private _layoutService: LayoutService,
                private _authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.adminUrl = 'https://finleysg.pythonanywhere.com/admin';
        this._layoutService.sidebarToggle.subscribe(value => this.isOpen = value);
        this._authService.currentUser$.subscribe(user => {
            this.user = user;
        });
        let today = moment();
        this.currentMonth = {
            year: today.year(),
            month: today.format('MMMM').toLowerCase()
        };
    }

    ngAfterViewInit(): void {
        // no-op-for-now
    }

    close(): void {
        this._layoutService.closeSidebar();
    }

    isCurrentRoute(parent: string): boolean {
        if (this._route && this._route.parent) {
            return this._route.parent.toString() === parent;
        }
        return false;
    }

    logout(): void {
        this._authService.logout().then( () => {
            this._router.navigate(['/']);
        });
    }
}
