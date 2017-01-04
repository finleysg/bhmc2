import { EventDetailService } from '../services/event-detail.service';
import { AuthenticationService, User } from '../../../core';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EventDetail, EventType } from "../models/event-detail";

@Component({
    moduleId: module.id,
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
            });
    }

    register(): void {
        if (this.eventDetail.eventType === EventType.League) {
            this.router.navigate(['reserve'], {relativeTo: this.route.parent});
        } else {
            // The group created is saved on the service
            this.eventService.reserve(this.eventDetail.id).then(() => {
                this.router.navigate(['register'], {relativeTo: this.route.parent});
            });
       }
    }

    viewRegistrations(): void {
        // TODO
    }
}
