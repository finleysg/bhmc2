import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User, EventDetailService, EventDocument, DocumentType,
    EventDetail, EventType, EventRegistrationGroup } from '../../../core';

@Component({
    moduleId: module.id,
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.css']
})
export class EventComponent implements OnInit {

    public eventDetail: EventDetail;
    public currentUser: User;
    public results: EventDocument;
    public teetimes: EventDocument;

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
                this.results = this.eventDetail.getDocument(DocumentType.Results);
                this.teetimes = this.eventDetail.getDocument(DocumentType.Teetimes);
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
