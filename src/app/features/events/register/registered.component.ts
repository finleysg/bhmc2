import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDetailService } from '../services/event-detail.service';
import { EventDetail } from '../models/event-detail';
import { ToasterService } from 'angular2-toaster';

@Component({
    moduleId: module.id,
    templateUrl: 'registered.component.html'
})
export class RegisteredComponent implements OnInit {

    private eventDetail: EventDetail;
    private courses: any[];

    constructor(private eventService: EventDetailService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data
            .subscribe((data: {eventDetail: EventDetail}) => {
                this.eventDetail = data.eventDetail;
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
