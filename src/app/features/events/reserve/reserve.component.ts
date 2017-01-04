import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventDetailService } from '../services/event-detail.service';
import { EventDetail } from '../models/event-detail';

@Component({
    moduleId: module.id,
    selector: 'bhmc-reserve',
    templateUrl: 'reserve.component.html',
    styleUrls: ['reserve.component.css']
})
export class ReserveComponent implements OnInit {

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
                    this.router.navigate([this.courses[0].id], {relativeTo: this.route, skipLocationChange: true});
                }
            });
    }
}
