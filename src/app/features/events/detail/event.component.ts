import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User, EventDetailService,
    EventDetail, EventType, EventRegistrationGroup } from '../../../core';

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
            this.eventService.reserve(this.eventDetail.id).then((group: EventRegistrationGroup) => {
                this.router.navigate(['register', group.id], {relativeTo: this.route.parent});
            });
       }
    }

    registered(): void {
        this.router.navigate(['registered'], {relativeTo: this.route.parent});
    }
}
