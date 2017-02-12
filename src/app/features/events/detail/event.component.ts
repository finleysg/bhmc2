import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService, User, EventDocument, DocumentType, SkinsType, StartType,
    EventDetail, EventType, DialogService, RegistrationService } from '../../../core';

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
    public hasSkins: boolean;
    public startType: string;
    public isRegistered: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private registrationService: RegistrationService,
        private dialogService: DialogService,
        private authService: AuthenticationService) { }

    ngOnInit(): void {
        this.isRegistered = false;
        this.currentUser = this.authService.user;
        this.route.data
            .subscribe((data: {eventDetail: EventDetail}) => {
                this.eventDetail = data.eventDetail;
                this.results = this.eventDetail.getDocument(DocumentType.Results);
                this.teetimes = this.eventDetail.getDocument(DocumentType.Teetimes);
                this.hasSkins = this.eventDetail.skinsType !== SkinsType.None;
                if (this.eventDetail.startType != StartType.NA) {
                    this.startType = this.eventDetail.startType.toString();
                }
                this.registrationService.isRegistered(this.eventDetail.id, this.currentUser.member.id)
                    .then(registered => {
                        this.isRegistered = registered;
                    });
            });
    }

    register(): void {
        if (this.eventDetail.eventType === EventType.League) {
            this.router.navigate(['reserve'], {relativeTo: this.route.parent});
        } else {
            this.registrationService.reserve(this.eventDetail.id).then(() => {
                this.router.navigate(['register'], {relativeTo: this.route.parent});
            });
       }
    }

    registered(): void {
        this.router.navigate(['registered'], {relativeTo: this.route.parent});
    }

    eventReport(): void {
        this.router.navigate(['report'], {relativeTo: this.route.parent});
    }

    checkInReport(): void {
        this.router.navigate(['check-in-report'], {relativeTo: this.route.parent});
    }

    showTodo(funcType: string): void {
        let message = '';
        if (funcType === 'teetimes') {
            message = `This is the function that the proshop staff will use to upload tee times for Majors or other
                        events like the member-guest. The system will automatically create a link to that document
                        on this page and on the home page.`;
        } else if (funcType === 'results') {
            message = `This is the function that the proshop staff will use to upload results for all events. The 
                        system will automatically create a link to the results document on this page and on the home page.`;
        } else if (funcType === 'add-remove') {
            message = `This is the function to add extra groups or, if needed, remove groups for Wednesday night sign-ups.
                        Typically this will be used to add the second group to par 3's.`;
        } else if (funcType === 'pre-event') {
            message = `This will take you to a page where you can do the pre-event check-ins / skins payments. I envision
                        that, if I do this right, this will be the preferred method (as opposed to the paper-pencil system
                        we use now.`;
        }
        this.dialogService.info('Admin Placeholder', message);
    }
}
