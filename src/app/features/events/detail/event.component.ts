import { EventDetailService } from '../event-detail.service';
import { AuthenticationService, User, EventDetail, EventType } from '../../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'bhmc-calendar',
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.css']
})
export class EventComponent implements OnInit {

    public eventDetail: EventDetail;
    public currentUser: User;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private eventService: EventDetailService,
        private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.currentUser = this.authService.user;
        this.route.data
            .subscribe((data: {eventDetail: EventDetail}) => {
                this.eventDetail = data.eventDetail;
            })
    }

    register(): void {
        if (this.eventDetail.eventType === EventType.League) {
            this.router.navigate(['reserve'], {relativeTo: this.route.parent});
        }
        else {
            // TODO: how to resolve this (as compared to a league registration)
            // this.eventService.reserve(this.eventDetail.id).then( group => {
            //     group.registrations.forEach( s => {
            //         s.isEventFeePaid = true;
            //     });
            // });
            this.router.navigate(['register'], {relativeTo: this.route.parent});
        }
    }

    viewRegistrations(): void {
        // TODO
    }
}
