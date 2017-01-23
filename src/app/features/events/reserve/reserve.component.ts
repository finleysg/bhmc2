import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, EventDetailService, EventDetail } from '../../../core';

@Component({
    moduleId: module.id,
    selector: 'bhmc-reserve',
    templateUrl: 'reserve.component.html',
    styleUrls: ['reserve.component.css']
})
export class ReserveComponent implements OnInit {

    eventDetail: EventDetail;
    courses: any[];

    constructor(private eventService: EventDetailService,
                private router: Router,
                private authService: AuthenticationService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data
            .subscribe((data: {eventDetail: EventDetail}) => {
                this.eventDetail = data.eventDetail;
                // TODO: move to a guard if we can figure out the ordering problem
                if (this.eventDetail.isRegistered(this.authService.user.member.id)) {
                    this.router.navigate(['registered'], {relativeTo: this.route.parent, replaceUrl: true});
                }
                this.courses = this.eventService.eventCourses(this.eventDetail);
                if (!this.route.firstChild) {
                    this.router.navigate([this.courses[0].id], {relativeTo: this.route, replaceUrl: true});
                }
            });
    }

    refresh(): void {
        this.eventService.refreshEventDetail().then(() => {
            // TODO: stop spinner
        });
    }
}
