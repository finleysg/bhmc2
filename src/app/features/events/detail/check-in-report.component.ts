import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventSignupTable } from '../models/event-signup-table';
import { EventDetailService, EventDetail } from '../../../core';

@Component({
    moduleId: module.id,
    templateUrl: 'check-in-report.component.html',
    styleUrls: ['check-in-report.component.css']
})
export class CheckInReportComponent implements OnInit {

    public tables: EventSignupTable[];
    public eventDetail: EventDetail;

    constructor(private eventService: EventDetailService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data
            .subscribe((data: {eventDetail: EventDetail}) => {
                this.tables = [];
                this.eventDetail = data.eventDetail;
                let courses = this.eventService.eventCourses(this.eventDetail);
                courses.forEach(course => {
                    this.eventService.signupTable(course.id).do(table => this.tables.push(table)).subscribe();
                });
            });
    }
}
