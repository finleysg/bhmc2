import { Component, OnInit } from '@angular/core';
import { User, AuthenticationService, EventDetail, EventDocument, DocumentType } from '../../../core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    templateUrl: 'match-play.component.html',
    styleUrls: ['match-play.component.css']
})

export class MatchPlayComponent implements OnInit {

    public eventDetail: EventDetail;
    public currentUser: User;
    public application: EventDocument;
    public canRegister: boolean;

    constructor(private route: ActivatedRoute,
                private authService: AuthenticationService) {
    }

    ngOnInit(): void {
        this.currentUser = this.authService.user;
        this.route.data
            .subscribe((data: { eventDetail: EventDetail }) => {
                this.eventDetail = data.eventDetail;
                this.application = this.eventDetail.getDocument(DocumentType.SignUp);
                this.canRegister = this.eventDetail.signupEnd.isAfter(moment()) && !this.currentUser.member.matchplayParticipant;
            });
    }
}
